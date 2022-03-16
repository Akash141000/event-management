import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared.module";
import { EventBusService } from "./eventBus.service";

@Module({
    imports:[SharedModule],
    exports:[],
    providers:[EventBusService]
})
export class EventBusModule{}