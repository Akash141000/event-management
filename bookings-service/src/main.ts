import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const config = new DocumentBuilder().setTitle('Bookings Service').setDescription('Bookings service api description').addBearerAuth({type:'http',scheme:'bearer',bearerFormat:'JWT',in:'header'},'access-token').setVersion('1.0').addTag('Bookings').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/bookings/docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();


