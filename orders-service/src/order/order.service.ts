import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, paymentStatus } from './order.model';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async addOrder(
    ticketId: string,
    eventId: string,
    userId: string,
  ) {
    const order = this.orderRepo.create({ eventId, userId, ticketId });
    const saved = await (await this.orderRepo.insert(order)).raw;
  //  const orderId = saved.identifiers.find((order)=>{return order})
    return saved.orderId;
  }

  async updateOrder(orderId:number){
    const updatedOrder = await this.orderRepo.update({orderId},{status:paymentStatus.success})
    return updatedOrder;
  }

  async expireOrder(orderId:number){
   const updatedOrder =  await this.orderRepo.update({orderId},{status:paymentStatus.fail})
    return updatedOrder;
  }
}
