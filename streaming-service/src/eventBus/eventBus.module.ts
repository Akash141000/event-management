import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared.module";
import { EventBusService } from "./eventBus.service";
import { Streaming, StreamingsSchema } from "../streamings/streaming.model";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[SharedModule],
    providers:[EventBusService],
    exports:[],
})
export class EventBusModule{}




