import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { ITiming } from 'src/util/types';
import { Event, EVENT_TYPE } from './event.modal';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { STREAMINGS_CREATE_QUEUE, STREAMINGS_CREATE_QUEUE_PATTERN, STREAMINGS_EXCHANGE } from 'src/util/constaints';

@Injectable()
export class EventService {
 private event:Event & { _id: any; };

  constructor(@InjectModel(Event.name) private eventModel:Model<Event>){}


  @RabbitSubscribe({
    exchange: STREAMINGS_EXCHANGE,
    routingKey: STREAMINGS_CREATE_QUEUE_PATTERN,
    queue: STREAMINGS_CREATE_QUEUE,
  })
  async addEvent(event:{msg:{_id:string,eventLink:string}}) {
   const save = await  this.eventModel.findByIdAndUpdate({ _id: event.msg._id },{$set:{
     eventLink:event.msg.eventLink
   }});
   
    if(!save){
      return new Nack(true);
    }
   }


  async createEvent(title:string,
    description:string,
    eventType:EVENT_TYPE,
    timing: ITiming,
    amount:number): Promise<Event & { _id: any; }>{
    this.event= await this.eventModel.create({title,description,eventType,timing,amount})
 
    if(!this.event){
      throw new BadRequestException();
    }
  return this.event
 }

 async save():Promise<boolean>{
   const saved = await this.event.save()
   if(!saved){
    throw new BadRequestException();
  }
  return true;
  }
 

 async getEvents(){
   return this.eventModel.find({})
 }

}
