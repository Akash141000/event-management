import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared.module';
import {OrderController} from "./order.controller";
import { Order } from './order.model';
import {OrderService} from "./order.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order]),SharedModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}
