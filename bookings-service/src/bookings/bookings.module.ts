import {Module} from "@nestjs/common"
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { SharedModule } from "src/shared.module";

@Module({
    imports:[SharedModule],
    controllers: [BookingsController],
    providers: [BookingsService],
})

export class BookingModule{}
    
