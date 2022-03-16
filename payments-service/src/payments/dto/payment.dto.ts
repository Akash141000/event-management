import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

export class CreateChargeDto{

    @IsInt()
    @ApiProperty({default:1})
    orderId:number;
    
    @IsInt()
    @ApiProperty({default:100})
    amount:number;

    @IsString()
    @ApiProperty()
    ticketId:string;

    @IsString()
    @ApiProperty({default:"tok_visa"})
    source:string;
}