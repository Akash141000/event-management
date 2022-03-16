import { Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { catchError, map, Observable } from 'rxjs';

@Controller("/api/streaming")
export class AppController {
  constructor(private readonly streamingService: AppService) {}

  @Post('create')
  createEvent(@Req() req: Request) {
    return this.streamingService
      .create(req.get('Authorization'))
      .subscribe((result) => {
        console.log('result', result);
      });
  }

 
  @Post(':eventId')
  addParticipants() {}

  @Get(':eventId')
  getEvent() {}
}
