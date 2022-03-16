import { ApiProperty } from "@nestjs/swagger";
import { ITiming } from "src/util/types";
import { EVENT_TYPE } from "../event.modal";
import { IsString,IsEnum,IsInt } from "class-validator";

export class AddEventDto{

    @IsString()
    @ApiProperty({default:'Event Title'})
    title:string;

    @IsString()
    @ApiProperty({default:'Event description'})
    description:string;

    @IsEnum(EVENT_TYPE)
    @ApiProperty({enum:['free','paid']})
    eventType:EVENT_TYPE;

    @ApiProperty({default:{"start":"2022-03-04T21:35","end":"2022-03-05T21:35"}})
    timing:ITiming;

    @IsInt()
    @ApiProperty({default:100})
    amount:number;
}