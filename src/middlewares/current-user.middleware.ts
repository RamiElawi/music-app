import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction,Response,Request } from "express";
import { JwtPayLoad } from "src/common/interfaces/jwt-payload.interface";
import { User } from "src/modules/auth/entities/user.entity";
import { AuthService } from "src/modules/auth/auth.service";


declare global{
    namespace Express{
        interface Request{
            CurrentUser?:User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private readonly userService:AuthService){}
    async use(req:Request,res:Response,next:NextFunction){
        const authHeader=req.get('Authorization')
        // console.log(authHeader)
        if(!authHeader){
            req.CurrentUser=null;
            console.log('here1')
            throw new UnauthorizedException()
        }
        try{
            const token=authHeader.split(' ')[1]
            const {email}=<JwtPayLoad>verify(token,process.env.SECRET_KEY)
            const user=await this.userService.findByEamil(email)
            req.CurrentUser=user;
        }catch(err){
            console.log('here2')
            req.CurrentUser=null;
            throw new UnauthorizedException()
        }
        next()
    }
}