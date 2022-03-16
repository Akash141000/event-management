import { Module } from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import { ORDERS_EXCHANGE } from "./util/constaints";
import {JwtModule} from "@nestjs/jwt";


@Module({
imports:[RabbitMQModule.forRoot(RabbitMQModule,{
    exchanges:[
        {name:ORDERS_EXCHANGE,type:"direct"}
    ],
    uri:process.env.EVENTBUS_URI,
    connectionInitOptions:{wait:false},}),JwtModule.register({secret:process.env.JWT_SECRET})],
exports:[RabbitMQModule],
})
export class SharedModule{}
