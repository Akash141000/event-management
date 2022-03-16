import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignupDto{

    @IsNotEmpty()
    @ApiProperty({default:'akash2000'})
    username:string;

    @IsNotEmpty()
    @ApiProperty({default:'akash.padwal@gmail.com'})
    email:string;

    @IsNotEmpty()
    @ApiProperty({default:'Password@123'})
    password:string;

    @IsNotEmpty()
    @ApiProperty({default:'Password@123'})
    confirmPassword:string;
}

export class LoginDto{
    
    @IsNotEmpty()
    @ApiProperty({default:'akash.padwal@gmail.com'})
    email:string;

    @IsNotEmpty()
    @ApiProperty({default:'Password@123'})
    password:string
}