import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { gender } from "src/common/enums/gender.enum"

export class CreateProfileDto{
    @IsString({message:'firstName should be string'})
    @IsNotEmpty()
    firstName:string
    @IsString({message:'lastName should be string'})
    @IsNotEmpty()
    lastName:string
    @IsNumber({},{message:'age should be number'})
    @IsNotEmpty()
    @Min(10,{message:'the min age is 10'})
    @Max(70,{message:'the max age is 70'})
    age:number
    @IsString({message:'phone should be string'})
    @IsNotEmpty()
    phone:string
    @IsEnum(gender,{message:`the gender should be from this option ${gender}`})
    @IsNotEmpty()
    gender:gender
    @IsString({message:'country should be string'})
    @IsNotEmpty()
    country:string
    @IsString({message:'city should be string'})
    @IsNotEmpty()
    city:string
    @IsString({message:'address should be string'})
    @IsNotEmpty()
    address:string
}