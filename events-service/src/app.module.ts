import { Module } from '@nestjs/common';
import { EventModule } from './events/event.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [EventModule,MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
