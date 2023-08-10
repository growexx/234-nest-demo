import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getMongoUri, seedData } from './db';
import * as TestCase from './mock-data/blog';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
let app: INestApplication;
let uri: string;
let jwtService: JwtService;
const tokenOptionalInfo: JwtSignOptions = {
  secret: process.env.JWT_SECRET,
  algorithm: 'HS256',
  expiresIn: 86400
};
// Invalid Token
const invalidToken = {
  token: ''
};

// Invalid
const invaliduser = {
  id: '5f083c352a7908662c334531',
  email: 'user@mailinator.com'
};
let requestPayloadInvalid: {token: string};

// Inactive
const inactiveUser = {
  id: '5f083c352a7908662c334535',
  email: 'inactive@mailinator.com'
};
let requestPayloadInactive: {token: string};

// User Token
const user = {
  id: '5f083c352a7908662c334532',
  email: 'user@mailinator.com'
};
const admin = {
  id: '5f5f2cd2f1472c3303b6b861',
  email: 'super@mailinator.com'
};
let requestPayloadUser: {token: string};
let requestPayloadAdmin: {token: string};
let baseUrl: any;
const validRequestBody = {
  title: "This is my first blog",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."
}

export const blogTest = () => describe('Blog Module (e2e)', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [JwtService]
    }).compile();
  
    uri = getMongoUri()  
    jwtService = new JwtService(tokenOptionalInfo)
  
    await seedData(uri, 'blog', TestCase.blogSeed)
  
    requestPayloadUser  = {
      token: jwtService.sign(user, tokenOptionalInfo)
    };
    requestPayloadAdmin  = {
      token: jwtService.sign(admin, tokenOptionalInfo)
    };
    requestPayloadInactive = {
      token: jwtService.sign(inactiveUser, tokenOptionalInfo)
    };
    requestPayloadInvalid = {
      token: jwtService.sign(invaliduser, tokenOptionalInfo)
    };
  
    app = moduleFixture.createNestApplication();
    await app.init();
    baseUrl = app.getHttpServer()
  });
  
  afterAll(async () => {
    await app.close();
  })

  describe('Create Blog', () => {
    it('Check invalid token ', () => {
      return request(app.getHttpServer())
        .post('/blog')
        .set({ Authorization: invalidToken.token })
        .send(validRequestBody)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Check invalid user', () => {
      return request(app.getHttpServer())
        .post('/blog')
        .set({ Authorization: requestPayloadInvalid.token })
        .send(validRequestBody)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Get inactive user details', () => {
      return request(app.getHttpServer())
        .post('/blog')
        .set({ Authorization: requestPayloadInactive.token })
        .send(validRequestBody)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.FORBIDDEN);
        });
    });

    TestCase.addBlog.forEach(data => {
      it(data.it, () => {
        return request(baseUrl)
          .post('/blog')
          .set({ Authorization: requestPayloadUser.token })
          .send(data.options)
          .then((res) => {
            expect(res.status).toEqual(data.status);
          });
      });
    });

    it('Add Blog', () => {
      return request(app.getHttpServer())
        .post('/blog')
        .set({ Authorization: requestPayloadUser.token })
        .send(validRequestBody)
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.CREATED);
          expect(res.body.status).toEqual(1);
        });
    });
  })

  describe('List Public Blog', () => {
    it('List Blog', () => {
        return request(app.getHttpServer())
            .get('/blog/list')
            .then((res) => {
                expect(res.body.status).toEqual(1);
                expect(res.body.data).toBeDefined();
                expect(res.body.data).toBeInstanceOf(Array);
            });
    });
  })

  describe('List My Blog', () => {
    it('Check invalid token ', () => {
        return request(app.getHttpServer())
          .get('/blog')
          .set({ Authorization: invalidToken.token })
          .then((res) => {
            expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
          });
    });
  
    it('Check invalid user', () => {
        return request(app.getHttpServer())
            .get('/blog')
            .set({ Authorization: requestPayloadInvalid.token })
            .then((res) => {
                expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
            });
    });

    it('Get inactive user details', () => {
        return request(app.getHttpServer())
            .get('/blog')
            .set({ Authorization: requestPayloadInactive.token })
            .then((res) => {
                expect(res.status).toEqual(HttpStatus.FORBIDDEN);
            });
    });

    it('List My Blog', () => {
        return request(app.getHttpServer())
          .get('/blog')
          .set({ Authorization: requestPayloadUser.token })
          .then((res) => {
            expect(res.status).toEqual(HttpStatus.OK);
            expect(res.body.status).toEqual(1);
            expect(res.body.data).toBeDefined();
            expect(res.body.data).toBeInstanceOf(Array);
          });
    });
  })

  describe('Find Blog', () => {
    it('Check invalid token ', () => {
        return request(app.getHttpServer())
          .get(`/blog/${TestCase.blogSeed[0]._id}`)
          .set({ Authorization: invalidToken.token })
          .then((res) => {
            expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
          });
    });
  
    it('Check invalid user', () => {
    return request(app.getHttpServer())
        .get(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInvalid.token })
        .then((res) => {
           expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Get inactive user details', () => {
    return request(app.getHttpServer())
        .get(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInactive.token })
        .then((res) => {
            expect(res.status).toEqual(HttpStatus.FORBIDDEN);
        });
    });

    it('Find Particular Blog', () => {
      return request(app.getHttpServer())
        .get(`/blog/${TestCase.blogSeed[0]._id.toString()}`)
        .set({ Authorization: requestPayloadUser.token })
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.OK);
          expect(res.body.status).toEqual(1);
          expect(res.body.data).toBeDefined();
          expect(res.body.data).toBeInstanceOf(Object);
        });
    });
  })

  describe('Update My Blog', () => {
    it('Check invalid token ', () => {
      return request(app.getHttpServer())
        .put(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: invalidToken.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Check invalid user', () => {
      return request(app.getHttpServer())
        .put(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInvalid.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Get inactive user details', () => {
      return request(app.getHttpServer())
        .put(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInactive.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
            expect(res.status).toEqual(HttpStatus.FORBIDDEN);
        });
    });

    it('Update My Blog', () => {
      return request(app.getHttpServer())
        .put(`/blog/${TestCase.blogSeed[0]._id.toString()}`)
        .set({ Authorization: requestPayloadUser.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.OK);
          expect(res.body.status).toEqual(1);
          expect(res.body.data).toBeDefined();
        });
    });
  })

  describe('Approve Blog', () => {
    it('Check invalid token ', () => {
      return request(app.getHttpServer())
        .patch(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: invalidToken.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Check invalid user', () => {
      return request(app.getHttpServer())
        .patch(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInvalid.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });

    it('Get inactive user details', () => {
      return request(app.getHttpServer())
        .patch(`/blog/${TestCase.blogSeed[0]._id}`)
        .set({ Authorization: requestPayloadInactive.token })
        .send(TestCase.blogSeed[0])
        .then((res) => {
            expect(res.status).toEqual(HttpStatus.FORBIDDEN);
        });
    });

    it('Approve Blog', () => {
      return request(app.getHttpServer())
        .patch(`/blog/${TestCase.blogSeed[0]._id.toString()}`)
        .set({ Authorization: requestPayloadAdmin.token })
        .send({ ...TestCase.blogSeed[0], isPublished: true })
        .then((res) => {
          expect(res.status).toEqual(HttpStatus.OK);
          expect(res.body.status).toEqual(1);
          expect(res.body.data).toBeDefined();
        });
    });
  })
});
