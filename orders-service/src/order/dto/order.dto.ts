import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateOrderDto{

    @IsString()
    @ApiProperty()
    userId:string;

    @IsString()
    @ApiProperty()
    ticketId:string;
    
    @IsString()
    @ApiProperty()
    eventId:string;
}