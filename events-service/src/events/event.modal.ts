

import {Prop,Schema,SchemaFactory,raw} from "@nestjs/mongoose";
import { Document,Types} from "mongoose";


interface ITicket {
  amount: number;
  status: boolean;
  userId?: string;
}

interface ITiming{
        start: string;
        end: string;      
}

export enum EVENT_TYPE {
    FREE = "free",
    PAID = "paid",
  }

@Schema({timestamps:true})
export class Event extends Document{

    @Prop({required:true})
    title:string

    @Prop(raw({
        start: {
          type: String,
          required: true,
        },
        end: {
          type: String,
          required: true,
         },}
    ))
    timing: ITiming

    @Prop(raw({
        amount: { type: Number, required: false },
        status: { type: Boolean, required: false },
        userId: { type: String, required: false },
      }))
    ticket:[ITicket]

    @Prop()
    eventType:EVENT_TYPE

    @Prop()
    amount:number

    @Prop()
    description:string;

}

export const EventsSchema = SchemaFactory.createForClass(Event);

