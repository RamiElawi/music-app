import { Body, Controller, Delete, Get, Patch, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProfileDto } from "./dto/createProfileDto.dto";
import { currentUser } from "src/common/decorators/currentUser.decorator";
import { User } from "../auth/entities/user.entity";
import { ProfileService } from "./profile.service";
import {diskStorage} from 'multer'
import { editFile } from "src/helpers/handlingFile.helper";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService:ProfileService){}

    @Get('/Profile')
    async getProfile(@currentUser() currentUser:User){
        console.log(currentUser)
        return await this.profileService.getProfile(currentUser.profileId)
    }

    @Patch('/changeImage')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            distination:'./files/userImage',
            filename:editFile
        })
    }))
    async changeImage(@UploadedFile() image:any,@currentUser() currentUser:User){
        return await this.profileService.changeImage(currentUser,image.path)
    }

    @Patch('/editProfile')
    async UpdateProfile(@Body() createProfile:CreateProfileDto,@currentUser() currentUser:User){
        return await this.profileService.updateProfile(createProfile,currentUser)
    }

    @Delete('/deleteImage')
    async deleteImage(@currentUser() currentUser:User){
        return await this.profileService.deleteImage(currentUser.profileId)
    }
}