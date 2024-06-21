import {  Injectable } from "@nestjs/common";
import {  PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-facebook'
import {config} from 'src/config'
import { AuthService } from "../auth.service";
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy,'facebook'){
    constructor(
        private readonly userService:AuthService
    ){
        super({
            clientID:config.OAuthFacebook.FACEBOOK_CLIENT_ID,
            clientSecret:config.OAuthFacebook.FACEBOOK_SECRET_ID,
            callbackURL:config.OAuthFacebook.CALL_BACK_URL,
            passReqToCallback:true,
            scope:config.OAuthFacebook.SCOPE

        })
    }

    async validate(request:any,accessToken:string,refreshToken:string,profile:any,done:any):Promise<void>{
        console.log("profile",profile)
        console.log("accessToken",accessToken)
        console.log("refreshToken",refreshToken)
        console.log("requert",request)
        const user=await this.userService.findByFacebookId(profile.id)
        if(user){
            const jwt=await this.userService.generatedJWTToken(profile.emails[0].value,user.id,user.roles)
            done(null,{user,jwt})
        }else{
            const {facebookUser,jwt}=await this.userService.singInFacebook(profile,profile.id )
            done(null,{facebookUser,jwt})
        }

    }

}