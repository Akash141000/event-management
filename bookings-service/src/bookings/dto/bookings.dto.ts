import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class AddTicketsDto{
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({default:10})
    tickets:number;
}

