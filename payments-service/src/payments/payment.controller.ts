import {
  Body,
  Controller,
  InternalServerErrorException,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { PaymentService } from '../payments/payment.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  ORDERS_EXCHANGE,
  ORDERS_PROCESSED_Q_PATTERN,
} from 'src/util/constaints';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateChargeDto } from './dto/payment.dto';


@ApiBearerAuth('access-token')
@Controller("/api/payments")
export class PaymentController implements OnModuleInit {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly amqp: AmqpConnection,
  ) {}

  onModuleInit() {
    this.paymentService.connectStripe();
  }


  @ApiResponse({})
  @Post('charge')
  async createCharge(
    @Body() createChargeDto:CreateChargeDto
  ) {
    const {amount,orderId,source,ticketId} = createChargeDto;
    const didCharge = await this.paymentService.createCharge(amount, source);
    if (!didCharge) {
      throw new InternalServerErrorException();
    }
    const result = await this.paymentService.insertPayment(orderId, ticketId);
    if (!result) {
      throw new InternalServerErrorException();
    }
    const eventData ={amount,orderId,source,ticketId,didCharge}
    this.amqp.publish(ORDERS_EXCHANGE, ORDERS_PROCESSED_Q_PATTERN,{msg: eventData});
    return {
      response: {
        result: result,
        paymendId: this.paymentService.paymentId,
      },
    };
  }
}
