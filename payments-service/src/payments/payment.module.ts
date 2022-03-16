import { Module } from '@nestjs/common';
import {PaymentController} from "./payment.controller";
import {PaymentService} from "./payment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import { Payment } from './payment.model';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),SharedModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
