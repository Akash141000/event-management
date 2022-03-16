import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const config = new DocumentBuilder().setTitle('Streaming Service').setDescription('Streaming service api description').addBearerAuth({type:'http',scheme:'bearer',bearerFormat:'JWT'},'access-token').setVersion('1.0').addTag('Streaming').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/streaming/docs', app, document);
  await app.listen(3000);
}
bootstrap();
