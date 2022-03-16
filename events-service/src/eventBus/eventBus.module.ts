import { Module } from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import { EVENTS_EXCHANGE } from "../util/constaints";
import { SharedModule } from "../shared.module";

@Module({
    imports:[SharedModule,RabbitMQModule.forRoot(RabbitMQModule,{
        exchanges:[
            {name:EVENTS_EXCHANGE,type:"direct"}
        ],
        uri: process.env.EVENTBUS_URI,
        connectionInitOptions:{wait:false},
    })],
    exports:[RabbitMQModule]
})
export class EventBusModule{}