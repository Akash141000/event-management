import { Controller, Get, Header, Param, Post, Req, UseGuards,Body } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Request } from 'express';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import { STREAMINGS_CREATE_QUEUE, STREAMINGS_CREATE_QUEUE_PATTERN } from 'src/utils/constaints';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard} from "../auth.guard"

@UseGuards(JwtAuthGuard)
ApiBearerAuth('access-token')
@Controller("/api/streaming")
export class StreamingController {
  constructor(private readonly streamingService: StreamingService,private readonly amqp:AmqpConnection) {}

  @ApiResponse({})
  @Post('create')
  createEvent(@Body() body: {eventId:string}) {
    const event =  this.streamingService
      .create(body.eventId)
    this.amqp.publish(STREAMINGS_CREATE_QUEUE,STREAMINGS_CREATE_QUEUE_PATTERN,{msg:event})//todo://
    return event;
  }
 
  @Post('/add/:eventId')
  addParticipants() {}

  @ApiResponse({})
  @Get('/get/:eventId')
  async getEvent(@Param('eventId') eventId:string) {
    return this.streamingService.getEvent(eventId)
  }
}
