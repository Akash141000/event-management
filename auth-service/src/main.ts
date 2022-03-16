import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder().setTitle('Auth Service').setDescription('Auth service api description').setVersion('1.0').addTag('Auth').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/auth/docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
//
