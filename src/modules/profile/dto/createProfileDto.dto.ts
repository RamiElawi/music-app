import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { gender } from "src/common/enums/gender.enum"

export class CreateProfileDto{
    @ApiProperty({})
    @IsString({message:'firstName should be string'})
    @IsNotEmpty()
    firstName:string
    @IsString({message:'lastName should be string'})
    @IsNotEmpty()
    @ApiProperty({})
    lastName:string
    @IsNumber({},{message:'age should be number'})
    @IsNotEmpty()
    @Min(10,{message:'the min age is 10'})
    @Max(70,{message:'the max age is 70'})
    @ApiProperty({})
    age:number
    @IsString({message:'phone should be string'})
    @IsNotEmpty()
    @ApiProperty({})
    phone:string
    @IsEnum(gender,{message:`the gender should be from this option ${gender}`})
    @IsNotEmpty()
    @ApiProperty({})
    gender:gender
    @IsString({message:'country should be string'})
    @IsNotEmpty()
    @ApiProperty({})
    country:string
    @IsString({message:'city should be string'})
    @IsNotEmpty()
    @ApiProperty({})
    city:string
    @IsString({message:'address should be string'})
    @IsNotEmpty()
    @ApiProperty({})
    address:string
}