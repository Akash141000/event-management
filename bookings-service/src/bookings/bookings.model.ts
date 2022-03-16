import {Prop,Schema,SchemaFactory,raw} from "@nestjs/mongoose";
import { Document,Types} from "mongoose";
import { ITicket,statusType } from "src/util/types";


@Schema({timestamps:true})
export class Booking extends Document{
  

  @Prop(raw([{
                 userId: {
                   type: String,
                   required: false,
                 },
                 amount: {
                   type: Number,
                   required: false,
                 },
                 status: {
                   type: String,
                   required: false,
                 },
                
}]))
tickets:ITicket[]

    addTickets: (noOfTickets: number) => Promise<boolean>;
    purchaseTicket: () => Promise<ITicket | null>;
    processingExpired: (ticket: ITicket) => Promise<boolean>;


}

export const BookingsSchema = SchemaFactory.createForClass(Booking);


BookingsSchema.methods.addTickets = async function (noOfTickets: number) {
  const tickets = [...this.tickets];
  for (let i = 0; i < noOfTickets; i++) {
    tickets.push({ amount: 10, status: statusType.available });
  }
  this.tickets = tickets;
  const saved = await this.save();
  return saved ? true : false;
};

BookingsSchema.methods.purchaseTicket = async function (): Promise<ITicket> {
  const ticket = this.tickets.find((ticket) => {
    return ticket.status === statusType.available;
  });
  if (!ticket) {
    return null;
  }
  ticket.status = statusType.processing;
  const updated = this.save();
  if (!updated) {
    return null;
  }
  return ticket;
};

BookingsSchema.methods.processingExpired = async function (
  ticket: ITicket
): Promise<boolean> {
  if (!ticket._id) {
    return false;
  }
  const ticketId = new Types.ObjectId(ticket._id);
  const ticketFound = this.tickets.find((ticketDoc) => {
    const id = new Types.ObjectId(ticketDoc._id);
    return id.equals(ticketId);
  });
  if (!ticketFound) {
    return false;
  }

  if(ticketFound.status === statusType.booked){
    return true;
  }
  ticketFound.status = statusType.available;
  this.save();
  return true;
};


