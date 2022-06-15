import { Module } from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import { STREAMINGS_EXCHANGE } from "./utils/constaints";
import {JwtModule} from "@nestjs/jwt";
import { Streaming, StreamingsSchema } from "./streamings/streaming.model";
import { MongooseModule } from '@nestjs/mongoose';
import { StreamingModule } from "./streamings/streaming.module";
import { EventBusModule } from "./eventBus/eventBus.module";
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [
      MongooseModule.forRoot(process.env.MONGO_URI),MongooseModule.forFeature([{ name: Streaming.name, schema: StreamingsSchema }]),
      PassportModule.register({
        session: false,
        defaultStrategy: 'oauth-bearer',
      }),
      RabbitMQModule.forRoot(RabbitMQModule,{
      exchanges:[
          {name:STREAMINGS_EXCHANGE,type:"direct"}
      ],
      uri: process.env.EVENTBUS_URI,
      connectionInitOptions:{wait:false},
   }),JwtModule.register({secret:process.env.JWT_SECRET})],
    exports:[RabbitMQModule,JwtModule,MongooseModule]
  })
  export class SharedModule {}