import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared.module';
import { StreamingModule } from './streamings/streaming.module';
import { EventBusModule } from './eventBus/eventBus.module';
import { Streaming, StreamingsSchema } from "./streamings/streaming.model";
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventBusModule,StreamingModule,SharedModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
