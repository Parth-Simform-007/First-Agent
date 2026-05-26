import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Summoning the NestJS application — Kuchiyose no Jutsu!
  const app = await NestFactory.create(AppModule);

  // Ninja Path Validation: Global pipes for request validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Mission Scroll Documentation: Swagger setup for API visibility
  const config = new DocumentBuilder()
    .setTitle('Referral Bonus API')
    .setDescription('Hidden Leaf Village Referral Bonus Management System')
    .setVersion('1.0')
    .addTag('Referral Bonus')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🍃 Hidden Leaf server running on: http://localhost:3000');
  console.log(
    '📜 Mission Scroll (Swagger) available at: http://localhost:3000/api',
  );
}

void bootstrap();
