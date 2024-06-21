import { Repository,EntityRepository} from "typeorm";
import { User } from "./entities/user.entity"
import {NotFoundException,BadRequestException,ForbiddenException} from '@nestjs/common'
import { encodePassword,comparePassword } from "src/utils/bcrypt";
import { LoginDto } from "./dtos/loginDto.dto";

import dataSource from "db/dataSource";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    
    async findbyEmail(email:string):Promise<User>{
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.email = :email',{email})
        .getOne()
    }


    async findByUserName(username:string){
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.username = :username',{username})
        .getOne()
    }

    async findByGoogleId(googleId:string){
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.googleId = :googleId',{googleId})
        .getOne()
    }

    async findByFacebookId(facebookId:string){
        return await dataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.facebookId = :facebookId',{facebookId})
        .getOne()
    }
    
}