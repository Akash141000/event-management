import { Module } from "@nestjs/common";
import {TypeOrmModule,TypeOrmModuleOptions} from "@nestjs/typeorm";
import { EventBusModule } from "./eventBus/eventBus.module";
import { Order } from "./order/order.model";
import { OrdersModule } from "./order/orders.module";
import { SharedModule } from "./shared.module";

const conn:TypeOrmModuleOptions = {
  type: "postgres",
  host:  process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Order],
  synchronize: true
} 


@Module({
  imports: [TypeOrmModule.forRoot(conn),OrdersModule,EventBusModule,SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
