import { Injectable } from '@nestjs/common';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDERS_EXCHANGE, ORDERS_EXPIRED_Q, ORDERS_EXPIRED_Q_PATTERN, ORDERS_PROCESSED_Q, ORDERS_PROCESSED_Q_PATTERN } from 'src/util/constaints';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/order.model';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class EventBusService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,private readonly ordersService:OrderService) {}

  @RabbitSubscribe({
    exchange: ORDERS_EXCHANGE,
    routingKey: ORDERS_EXPIRED_Q_PATTERN,
    queue: ORDERS_EXPIRED_Q,
  })
  async orderExpired(event: {msg:number}) {
    console.log('orderExpired',event);
   const expired = this.ordersService.expireOrder(event.msg);
    if(!expired){
      return new Nack(true);
    }
  }

  @RabbitSubscribe({
    exchange: ORDERS_EXCHANGE,
    routingKey: ORDERS_PROCESSED_Q_PATTERN,
    queue: ORDERS_PROCESSED_Q,
  })
  async orderProcessing(event: {msg:{amount:number,orderId:number,source:string,ticketId:string,didCharge:boolean}}) {
    if(event.msg.didCharge){
    const updateResult =   await this.ordersService.updateOrder(event.msg.orderId);
      if(!updateResult){
      return new Nack(true)
      }
    }
  }

}
