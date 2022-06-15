import { Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/")
export class AppController {
  constructor() {}

  // @Post('create')
  // createEvent(@Req() req: Request) {
  //   return this.streamingService
  //     .create(req.get('Authorization'))
      
  // }

 
  // @Post(':eventId')
  // addParticipants() {}

  // @Get(':eventId')
  // getEvent() {}
}
