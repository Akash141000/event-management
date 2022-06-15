import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { ORDERS_EXCHANGE, ORDERS_GENERATED_Q_PATTERN } from 'src/util/constaints';
import { OrderService } from './order.service';
import {CreateOrderDto} from "./dto/order.dto";
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth.guard';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller("/api/orders")
export class OrderController {
  constructor(private  orderService: OrderService,private amqp:AmqpConnection) {}


  @ApiResponse({})
  @Post("create")
  async createOrder(
    @Body() createOrderDto:CreateOrderDto
  ) {
    const {ticketId,eventId,userId} = createOrderDto;
    const order = await  this.orderService.addOrder(ticketId,eventId,userId);
    this.amqp.publish(ORDERS_EXCHANGE,ORDERS_GENERATED_Q_PATTERN,{msg: order});
    return order;
  }
  
}
