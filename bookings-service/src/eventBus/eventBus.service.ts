import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from '../bookings/bookings.model';
import { ITicket } from 'src/util/types';
import {Model} from "mongoose";
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BOOKINGS_EXCHANGE,
  EVENTS_EXCHANGE,
  EXPIRED_TICKETS_Q,
  EXPIRED_TICKETS_Q_PATTERN,
  NEW_EVENT_QUEUE,
  NEW_EVENT_Q_PATTERN,
} from 'src/util/constaints';

@Injectable()
export class EventBusService{
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,
      ) {}
  @RabbitSubscribe({
    exchange: EVENTS_EXCHANGE,
    routingKey: NEW_EVENT_Q_PATTERN,
    queue: NEW_EVENT_QUEUE,
  })
  async addEvent(event:{msg:{_id:string}}) {
    const booking = new this.bookingModel({ _id: event.msg._id,tickets:[] });
    const save = await booking.save();
    if(!save){
      return new Nack(true);
    }
   }

   @RabbitSubscribe({
     exchange:BOOKINGS_EXCHANGE,
     routingKey:EXPIRED_TICKETS_Q_PATTERN,
     queue:EXPIRED_TICKETS_Q,
   })
   async processingExpired(eventData:{msg:{eventId:string,ticket:ITicket}}){
     const {eventId, ticket} = eventData.msg;
    const event = await this.bookingModel.findById(eventId);
    const expired = await event.processingExpired(ticket);
    if(!expired){
      return new Nack(true);
    }  
  }
}