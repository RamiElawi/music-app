import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-google-oauth20'
import { config } from "src/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(
        private readonly userService:AuthService
    ){
        super({
            clientID:config.OAuthGoogle.GOOGLE_CLIENT_ID,
            clientSecret:config.OAuthGoogle.GOOGLE_CLIENT_SECRET,
            callbackURL:config.OAuthGoogle.CALL_BACK_URL,
            passReqToCallback:true,
            scope:config.OAuthGoogle.SCOPE
        })
    }

    async validate(request:any,accessToken:string,refreshToken:string,profile:any,done:any):Promise<void>{
        console.log("profile",profile)
        console.log("accessToken",accessToken)
        console.log("refreshToken",refreshToken)
        console.log("requert",request)
        const user=await this.userService.findByGoogleId(profile.id)
        if(user){
            const jwt=await this.userService.generatedJWTToken(profile.emails[0].value,user.id,user.roles)
            done(null,{user,jwt})
        }else{
            const {googleuser,jwt}=await this.userService.singInGoogle(profile,profile.id )
            done(null,{googleuser,jwt})
        }

    }

}