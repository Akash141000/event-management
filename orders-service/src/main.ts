import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Orders Service').setDescription('Orders service api description').addBearerAuth({type:'http',scheme:'bearer',bearerFormat:'JWT'},'access-token').setVersion('1.0').addTag('Orders').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/orders/docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
