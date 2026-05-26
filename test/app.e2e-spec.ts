import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('ReferralBonus API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    const config = new DocumentBuilder()
      .setTitle('Referral Bonus API')
      .setDescription('Hidden Leaf Village Referral Bonus Management System')
      .setVersion('1.0')
      .addTag('Referral Bonus')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
  });

  it('/api-json (GET)', () => {
    return request(app.getHttpServer())
      .get('/api-json')
      .expect(200)
      .expect((response: { body: { info: { title: string } } }) => {
        expect(response.body.info.title).toBe('Referral Bonus API');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
