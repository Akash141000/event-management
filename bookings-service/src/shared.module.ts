import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingsSchema } from './bookings/bookings.model';
import { BOOKINGS_EXCHANGE, EVENTS_EXCHANGE } from './util/constaints';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingsSchema }]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: EVENTS_EXCHANGE, type: 'direct' },{name:BOOKINGS_EXCHANGE,type:'direct'}],
      uri: process.env.EVENTBUS_URI,
      connectionInitOptions: { wait: false },
    }),
    PassportModule.register({
      session: false,
      defaultStrategy: 'oauth-bearer',
    }),
    JwtModule.register({secret:process.env.JWT_SECRET})
  ],
  exports: [ConfigModule, MongooseModule, RabbitMQModule, PassportModule],
})
export class SharedModule {}
