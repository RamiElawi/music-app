import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUserDto.dto";
import { CreateProfileDto } from "../profile/dto/createProfileDto.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/loginDto.dto";
import { ResetPasswordDto } from "./dtos/resetPasswordDto.dto";
import { currentUser } from "src/common/decorators/currentUser.decorator";
import { User } from "./entities/user.entity";
import { Profile } from "../profile/entities/profile.entity";
import { Favorite } from "../favorite/entities/favorite.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('/register')
    async signUp(
        @Body() createUserDto:CreateUserDto,
        @Body() createProfileDto:CreateProfileDto
    ){
        return await this.authService.singUp(createUserDto,createProfileDto)
    }

    @Get('email/verify/:token')
    async verifyEmail(@Param('token') token:string){
        return await this.authService.verifyEmail(token)
    }
    
    @Post('/login')
    async singIn(@Body() loginDto:LoginDto){
        return await this.authService.singIn(loginDto)
    }

    @Get('eamil/forgotPassword')
    async forgotPassword(@Body() email:string){
        return await this.authService.sendEmailForgottenPassword(email)
    }

    @Post('email/resetPassword')
    async resetPassword(@Body() resetPassword:ResetPasswordDto){
        return await this.authService.setNewPassword(resetPassword)
    }

    @Get('user-main-data')
    async getUserData(@currentUser() user:User):Promise<{user:User,profile:Profile,favorite:Favorite}>{
        return await this.authService.getUserData(user);
    }


    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(){

    }

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallBack(@Req()req,@Res()res){
        const jwt:string=req.user.jwt;
        console.log("jwt from google:",jwt)
        if(jwt){
            res.redirect(`http://localhost:3000/login/google/success/userId:${req.user.user.id}/accessToken:${jwt}`)
        }else{
             res.redirect(`http://localhost:3000/login/google/failure`)
        }
    }
    @Get('/login/facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogIn(){

    }

    @Get('/facebook/callback')
    @UseGuards(AuthGuard('facebook'))   
    async facebookLoginCallBack(@Req()req,@Res()res){
        const jwt:string=req.user.jwt;
        console.log("jwt from google:",jwt)
        if(jwt){
            res.redirect(`http://localhost:3000/login/facebook/success/userId:${req.user.user.id}/accessToken:${jwt}`)
        }else{
             res.redirect(`http://localhost:3000/login/facebook/failure`)
        }
    }
}