import { BadRequestException, Body, Controller, Get, Param, Post,UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import { BOOKINGS_EXCHANGE, PROCESSING_TICKETS_Q_PATTERN } from 'src/util/constaints';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AddTicketsDto } from './dto/bookings.dto';
import { JwtAuthGuard } from '../auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller("/api/bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService,private readonly amqpConn:AmqpConnection) {}


  @ApiResponse({})
  @Post("addTickets/:eventId")
  async addTicket(@Param("eventId") eventId:string,@Body() addTicketsDto:AddTicketsDto){
   
   const {tickets} = addTicketsDto;
    if(!tickets){
      throw new BadRequestException();
    }
    this.bookingsService.validate(eventId);
    await this.bookingsService.find(eventId);
    const isTrue = await this.bookingsService.addTickets(tickets);
    if(!isTrue){
      throw new Error("Error while adding tickets");
    }
    return{message: "Successfully added tickets"}
  }

  @ApiResponse({})
  @Get("purchase/:eventId")
  async purchaseTicket(@Param("eventId") eventId:string){
    this.bookingsService.validate(eventId);
    await this.bookingsService.find(eventId);
    const ticket =await this.bookingsService.purchaseTicket();
    if(!ticket){
     return {message:"Event is full"};
    }
    this.amqpConn.publish(BOOKINGS_EXCHANGE,PROCESSING_TICKETS_Q_PATTERN,{msg:{
      ticket:ticket,
      eventId:eventId,
    }})
    return {message:ticket};
  }
}
