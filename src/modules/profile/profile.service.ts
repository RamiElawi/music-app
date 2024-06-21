import { BadRequestException, Injectable, NotFoundException, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "./profile.repository";
import { FavoriteService } from "../favorite/Favorite.service";
import { CreateProfileDto } from "./dto/createProfileDto.dto";
import { User } from "../auth/entities/user.entity";
import { Profile } from "./entities/profile.entity";
import dataSource from "db/dataSource";
import { clearImage } from "src/utils/clearImage";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileRepository) private readonly profileRepository:ProfileRepository,
        private readonly favoriteService:FavoriteService
    ){}

    async createProfile(user:User,createProfile:CreateProfileDto):Promise<Profile>{
        const isPhoneNumberExsit=await this.profileRepository.findPhoneNumber(createProfile.phone);
        if(isPhoneNumberExsit) throw new BadRequestException('this phone number is already exist')
        const profile=new Profile()
        Object.assign(profile,createProfile)
        // profile.user=user;
        const favorite=await this.favoriteService.createFavorite(profile)
        profile.favorite=favorite;
        return await profile.save()
    }


    async getProfile(profileId:number){
        const profile=await this.profileRepository.getProfileById(profileId)
        if(!profile) throw new NotFoundException("this profile is not found")
        return profile;
    }
    
    async updateProfile(createProfile:CreateProfileDto,currentUser:User){
        await this.getProfile(currentUser.profileId)
        return await this.profileRepository.updateProfile(createProfile,currentUser.profileId)
    }

    async changeImage(user:User,imagePath:string){
        const profile=await this.getProfile(user.profileId)
        if(profile.image) clearImage(profile.image)
        return await this.profileRepository.changeImage(user.profileId,imagePath)
    }
    
    async deleteImage(profileId:number){
        const profile=await this.getProfile(profileId)
        if(profile.image) clearImage(profile.image)
        return await this.profileRepository.deleteImage(profileId)
    }

}