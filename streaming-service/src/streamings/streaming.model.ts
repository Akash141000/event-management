import {Prop,Schema,SchemaFactory,raw} from "@nestjs/mongoose";
import { Document,Types} from "mongoose";


@Schema({timestamps:true})
export class Streaming extends Document{
  

 @Prop({require:false})
 eventLink:string;


}

export const StreamingsSchema = SchemaFactory.createForClass(Streaming);


