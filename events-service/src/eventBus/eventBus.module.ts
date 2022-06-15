import { Module } from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import { EVENTS_EXCHANGE, STREAMINGS_EXCHANGE } from "../util/constaints";
import { SharedModule } from "../shared.module";

@Module({
    imports:[SharedModule,RabbitMQModule.forRoot(RabbitMQModule,{
        exchanges:[
            {name:EVENTS_EXCHANGE,type:"direct"},
            {name:STREAMINGS_EXCHANGE,type:"direct"}
        ],
        uri: process.env.EVENTBUS_URI,
        connectionInitOptions:{wait:false},
    })],
    exports:[RabbitMQModule]
})
export class EventBusModule{}