import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)//middleware validation field trong body gui vao(du lieu dau vao)
  // setupp swagger
  const config = new DocumentBuilder()
    .setTitle("movie node38")
    .setDescription("Day la list API Movie")
    // .addBasicAuth()
    .addBearerAuth()
    .addCookieAuth()
    .setVersion("1.0")
    .build()

  const swagger = SwaggerModule.createDocument(app, config)
  const swaggerAPI = SwaggerModule.setup("swagger", app, swagger)

  await app.listen(3000);
}
bootstrap();
// npx prisma init
//npx prisma db pull
// npx prisma generate
