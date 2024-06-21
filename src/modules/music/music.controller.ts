import { Controller ,Get,Post,Delete,Put,Param,Body,Query} from '@nestjs/common';
import { CreateMusicDto } from './dtos/createMusicDto.dto';
import { UpdateMusicDto } from './dtos/updateMusicDto.dto';
import { MusicService } from './music.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('music')
@ApiTags('music')
export class MusicController {
    constructor(private readonly musicService:MusicService){}
    
    @Get("/getAllMusic")
    async getAllMusic(@Query('limit') limit:number=5,@Query('skip') skip:number=0){
        return await this.musicService.getAllMusic(limit,skip)
    }
    @Get('/:id')
    async getMusicById(@Param('id') musicId:number){
        return await this.musicService.getMusicById(musicId); 
    }

    @Post("/addMusic")
    async createMusicAlbum(@Body('createMusicDto') createMusicDto:CreateMusicDto){
        return await this.musicService.createMusic(createMusicDto)
    }
    @Put('updateMusic/:id')
    async updateMusicianAlbum(@Param('id') musicId:number,@Body('updateMusicDto') updateMusicDto:UpdateMusicDto){
        return await this.musicService.updateMusic(musicId,updateMusicDto)
    }
    @Delete('deleteMusic/:id')
    async deleteMusic(@Param('id') musicId:number){
        return await this.musicService.deleteMusic(musicId)
    }

    @Post(':musicId/saveToFavoriteList/:favoriteId')
    async saveToFavoirteList(@Param()musicId:number,@Param()favoriteId:number){
        return await this.musicService.pushToFavoriteService(musicId,favoriteId)
    }
}

