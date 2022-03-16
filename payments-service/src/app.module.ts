import { Module } from '@nestjs/common';
import {TypeOrmModule,TypeOrmModuleOptions} from "@nestjs/typeorm";
import { Payment } from './payments/payment.model';
import { PaymentModule } from './payments/payment.module';
import { SharedModule } from './shared.module';

const conn:TypeOrmModuleOptions = {
  type: "postgres",
  host:  process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Payment],
  synchronize: true
} 

@Module({
  imports: [TypeOrmModule.forRoot(conn),PaymentModule,SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
