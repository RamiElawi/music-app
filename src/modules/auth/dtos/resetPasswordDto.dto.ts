import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ResetPasswordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly newPassword:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly newPasswordToken:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly currentPassword:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly confirmCurrentPassword:string
}