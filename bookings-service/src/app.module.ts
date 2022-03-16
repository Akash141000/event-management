import { Module } from '@nestjs/common';
import { MongooseModule} from "@nestjs/mongoose";
import { BookingModule } from './bookings/bookings.module';
import { EventBusModule } from './eventBus/eventBus.module';
import { SharedModule } from './shared.module';

@Module({
  imports: [BookingModule,SharedModule,EventBusModule,MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
