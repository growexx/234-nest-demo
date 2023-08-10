import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authTest } from './auth.e2e-spec';
import { blogTest } from './blog.e2e-spec';
import { endTest } from './end.e2e-spec';

export const appTest = () => describe('App Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await setTimeout(async () => {
      await app.close();
    }, 200)
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.status).toEqual('ok');
        expect(res.body.date).toBeDefined();
      });
  });
});
appTest()
authTest()
blogTest()
endTest()
