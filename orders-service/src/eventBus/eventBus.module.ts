import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/order/order.model";
import { OrderService } from "src/order/order.service";
import { SharedModule } from "src/shared.module";
import { EventBusService } from "./eventBus.service";

@Module({
    imports:[TypeOrmModule.forFeature([Order]),SharedModule],
    exports:[],
    providers:[EventBusService,OrderService]
})
export class EventBusModule{}