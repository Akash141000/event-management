import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Payment } from './payment.model';



@Injectable()
export class PaymentService {
  stripe:Stripe
  paymentId: string;
  amount: number;
  currency:string="inr";

  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}


  connectStripe(){
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2020-08-27',
      typescript: true,
    })
  }

  async createCharge(
    amount: number,
    source: string,
  ): Promise<boolean> {
    const chargeCreated =  await this.stripe.charges.create({
      amount,
      source,
      currency:this.currency,
    });
    if(!chargeCreated){
      return false;
    }
    this.paymentId = chargeCreated.id;
    this.amount = amount;
    return true
  }

  async insertPayment(orderId:number,ticketId:string) {
    const paymentCreated = this.paymentRepo.create({
      paymentId:this.paymentId,
      amount:this.amount,
      orderId:orderId,
      ticketId:ticketId,
    });
    const saved = await this.paymentRepo.save(paymentCreated)
    if(!saved){
      return false
      }
    return true
  }
 
}
