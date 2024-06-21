import { Controller ,Get ,Post ,Delete ,Put ,Param ,Query ,Body} from '@nestjs/common';
import { CreateMusicianAlbumDto } from './dtos/createMusicianAlbumDto.dto';
import { UpdateMusicianAlbumDto } from './dtos/updateMusicianAlbumDto.dto';
import { MusicianAlbumService } from './musician-album.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('musician-album')
@ApiTags('musician Album')
export class MusicianAlbumController {
    constructor(private readonly mAlbumService:MusicianAlbumService){}

    @Get("/getAllMusicianAlbum")
    async getAllMusicianalbums(@Query('limit') limit:number=5,@Query('skip') skip:number=0){
        return await this.mAlbumService.getMAlbums(limit,skip)
    }
    @Get(':id')
    async getMusicianAlbumById(@Param('id') musicianAlbumId:number){
        return await this.mAlbumService.getMAlbumById(musicianAlbumId)
    }
    @Post("/addMusicianAlbum")
    async createMusicianAlbum(@Body('createMusicianAlbum') createMusicianAlbum:CreateMusicianAlbumDto){
        return await this.mAlbumService.addMAlbum(createMusicianAlbum)
    }
    @Put('updateMusicianAlbum/:id')
    async updateMusicianAlbum(@Param('id') musiciaAlbumId:number,@Body('updateMusicianAlbumDto') updateMusicianAlbumDto:UpdateMusicianAlbumDto){
        return await this.mAlbumService.updateMAlbum(musiciaAlbumId,updateMusicianAlbumDto)
    }
    @Delete('deleteMusicianAlbum/:id')
    async deleteMusicianAlbum(@Param('id') musicianAlbumId:number){
        return await this.mAlbumService.deleteMAlbum(musicianAlbumId)
    }
}

