import { EntityRepository, InsertResult, Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";
import { CreateProfileDto } from "./dto/createProfileDto.dto";
import dataSource from "db/dataSource";
import { FavoriteService } from "../favorite/Favorite.service";
import { Favorite } from "../favorite/entities/favorite.entity";
import { User } from "../auth/entities/user.entity";
import { retry } from "rxjs";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile>{

    // async createProfile(user:User,createProfileDto:CreateProfileDto):Promise<Profile>{
        // const profile=new Profile()
        // Object.assign(profile,createProfileDto)
        // profile.user=user;
        // return await profile.save()
    // }   

    async findPhoneNumber(phone:string):Promise<Profile>{
        return await dataSource
        .getRepository(Profile)
        .createQueryBuilder("profiles")
        .where('profiles.phone = :phone',{phone})
        .getOne()
    }

    async getProfileById(profileId:number):Promise<Profile>{
        return await dataSource
        .getRepository(Profile)
        .createQueryBuilder('profiles')
        .where('profiles.id = :profileId',{profileId})
        .getOne()
    }

    async updateProfile(createProfile:CreateProfileDto,profileId:number){
        return await dataSource
        .createQueryBuilder()
        .update(Profile)
        .set({...createProfile})
        .where('profiles.id = :profileId',{profileId})
        .execute()
    }
    
    async changeImage(profileId:number,imagePath:string){
        return await dataSource
        .createQueryBuilder()
        .update(Profile)
        .set({image:imagePath})
        .where('profiles.id = :profileId',{profileId})
        .execute()
    }

    async deleteImage(profileId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Profile)
        .where('profiles.id = :profileId',{profileId})
        .execute()
    }
}