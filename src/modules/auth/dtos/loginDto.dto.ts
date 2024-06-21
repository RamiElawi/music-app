import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto{
    @IsEmail({},{message:"this email is not valide"})
    email:string;
    @IsNotEmpty()
    password:string;
}