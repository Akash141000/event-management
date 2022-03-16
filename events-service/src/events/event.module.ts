import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventsSchema } from './event.modal';
import { EventBusModule } from '../eventBus/eventBus.module';
import { SharedModule } from '../shared.module';


@Module({
  imports: [SharedModule,MongooseModule.forFeature([{name:Event.name,schema:EventsSchema}]),EventBusModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
