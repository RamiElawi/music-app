import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto{
    @ApiProperty()
    @IsEmail({},{message:"this email is not valide"})
    email:string;
    @ApiProperty()
    @IsNotEmpty()
    password:string;
}