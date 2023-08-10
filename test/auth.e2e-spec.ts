import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getMongoUri, seedData } from './db';
import { SignupTestCases, USER1, SignInTestCases, users } from './mock-data/auth';
import { JwtService } from '@nestjs/jwt';
import { CryptService } from '../src/util/crypt.service';
import { ConfigService } from '@nestjs/config';

export const authTest = () => describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let uri: string;
  let jwtService: JwtService;
  let cryptService: CryptService;
  let tokenInfo: Object;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [JwtService]
    }).compile();

    uri = getMongoUri()

    tokenInfo = {
      secret: process.env.JWT_SECRET,
      algorithm: 'HS256',
      expiresIn: 86400
    }
    jwtService = new JwtService(tokenInfo)
    cryptService = new CryptService(jwtService, new ConfigService())

    const hash = '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e';
    const user = await Promise.all(
      users.map(async (user) => {
        user.password = await cryptService.enCryptPassword(hash);
        return user;
    }));
    await seedData(uri, 'user', user)

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  SignupTestCases.forEach((data) => {
    it(data.it, () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(data.options)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
        });
    });
  });

  it('As a user I should validate if email is already registered and login', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(USER1)
      .expect(201)
      .then(res => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual(1);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.email).toEqual(USER1.email);
      });
  });

  it('As a user I should validate if my email is already registered or not, If register then login', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(USER1)
      .then(res => {
        expect(res.body.status).toEqual(1);
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.token).toBeDefined();
      });
  });

  SignInTestCases.forEach((data) => {
    it(data.it, () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(data.options)
        .then((res) => {
          if (!data.statusCode) expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
          else expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
        });
    });
  });

  it('As a user, I should validate if my email is registered or not', () => {
    const loginUser = {
      'email': 'nest@growexx.in',
      'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
    };
    return request(app.getHttpServer())
        .post('/auth/signin')
        .send(loginUser)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
  });

  it('As a user, I should validate if invalid password', () => {
      const loginUser = {
          'email': USER1.email,
          'password': '8776f108e247ab1e3b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
      };
      return request(app.getHttpServer())
          .post('/auth/signin')
          .send(loginUser)
          .then((res) => {
            expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
          });
  });

  it('As a user, I should validate if valid password but user is not active', () => {
    const loginUser = {
      'email': 'inactive@mailinator.com',
      'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
    };
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginUser)
      .then((res) => {
        expect(res.statusCode).toEqual(423);
      });
  });

  it('As a user, I should validate and login with correct credentials', () => {
    const loginUser = {
      'email': USER1.email,
      'password': USER1.password
    };
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginUser)
      .expect(200)
      .then((res) => {
        expect(res.body.data.token).toBeDefined();
        expect(res.body.status).toEqual(1);
      });
  });

  it('Check for invalid token', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: '' })
      .then((res) => {
        expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
      });
  });

  it('Check for invalid user', () => {
    const invaliduser = {
      id: '5f083c352a7908662c334531',
      email: 'user@mailinator.com'
    };
    const requestPayloadInvalid = {
      token: jwtService.sign(invaliduser, tokenInfo)
    };
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: requestPayloadInvalid.token })
      .then((res) => {
        expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
      });
  });

  it('Get inactive user details', () => {
    const inactiveUser = {
      id: '5f083c352a7908662c334535',
      email: 'inactive@mailinator.com'
    };
    const requestPayloadInactive = {
      token: jwtService.sign(inactiveUser, tokenInfo)
    };  
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: requestPayloadInactive.token })
      .then((res) => {
        expect(res.status).toEqual(HttpStatus.FORBIDDEN);
      });
  });

  it('Get user details', () => {
    const user = {
      id: '5f083c352a7908662c334532',
      email: 'user@mailinator.com'
    };
    const requestPayloadUser = {
      token: jwtService.sign(user, tokenInfo)
    };  
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: requestPayloadUser.token })
      .expect(200)
      .then((res) => {
        expect(res.body.data.email).toEqual(user.email);
    });
  });
});
