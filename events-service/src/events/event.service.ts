import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { ITiming } from 'src/util/types';
import { Event, EVENT_TYPE } from './event.modal';

@Injectable()
export class EventService {
 private event:Event & { _id: any; };

  constructor(@InjectModel(Event.name) private eventModel:Model<Event>){}

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
