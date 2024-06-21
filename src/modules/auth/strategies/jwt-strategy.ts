import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import {Strategy,ExtractJwt} from 'passport-jwt'
import { User } from "../entities/user.entity";
import { JwtPayLoad } from "src/common/interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user.repository";

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private readonly authRepository:UserRepository){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.SECRET_KEY
        })
    }

    async validate(payLoad:JwtPayLoad):Promise<User>{
        const {email,userId,role}=payLoad
        const user=this.authRepository.findbyEmail(email) ;
        if(!user) throw new UnauthorizedException('user is not authourized')
        return user
    }
}