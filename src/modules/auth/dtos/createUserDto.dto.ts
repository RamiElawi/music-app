import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto{
    @IsString({message:"userName should be string"})
    @IsNotEmpty()
    @ApiProperty({})
    username:string
    @ApiProperty({})
    @IsEmail({},{message:'this email is not valid'})
    @IsNotEmpty()
    email:string
    @ApiProperty({})
    @IsNotEmpty()
    @Length(3,15,{message:'the password length should be between 3 and 15'})
    password:string
}