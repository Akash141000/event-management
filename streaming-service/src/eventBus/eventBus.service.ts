import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  EVENTS_EXCHANGE,
  NEW_EVENT_QUEUE,
  NEW_EVENT_Q_PATTERN,
} from '../utils/constaints';
import { Streaming } from "../streamings/streaming.model";

@Injectable()
export class EventBusService{
    constructor(
        @InjectModel(Streaming.name) private streamingModel: Model<Streaming>,
      ) {}
  @RabbitSubscribe({
    exchange: EVENTS_EXCHANGE,
    routingKey: NEW_EVENT_Q_PATTERN,
    queue: NEW_EVENT_QUEUE,
  })
  async addEvent(event:{msg:{_id:string}}) {
    const streaming = new this.streamingModel({ _id: event.msg._id });
    const save = await streaming.save();
    if(!save){
      return new Nack(true);
    }
   }


}