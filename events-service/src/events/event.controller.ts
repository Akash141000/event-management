import { BadRequestException, Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { EVENT_TYPE } from './event.modal';
import { EventService } from './event.service';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import { EVENTS_EXCHANGE, NEW_EVENT_Q_PATTERN } from '../util/constaints';
import { ITiming } from '../util/types';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AddEventDto } from './dto/events.dto';
import { JwtAuthGuard } from '../auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller("/api/events")
export class EventController {
  constructor(private readonly eventService: EventService,private readonly amqp:AmqpConnection) {}

  @ApiResponse({})
  @Post("addEvent")
  async addEvent(@Body() addEventDto:AddEventDto){
   
   const {amount,title,description,eventType,timing} = addEventDto;
    if(!(title && description && eventType && timing && amount)){
      throw new BadRequestException();
    }
    const event = await this.eventService.createEvent(title,description,eventType,timing,amount);
    
    await this.eventService.save();
   
    this.amqp.publish(EVENTS_EXCHANGE,NEW_EVENT_Q_PATTERN,{msg:event})

    return {
      message:"Event added successfully!",
      content:event,
    }
  }

  @ApiResponse({})
  @Get("getEvents")
  async getEvents(){
    return this.eventService.getEvents();
  }
  
}


