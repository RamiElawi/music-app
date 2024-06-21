import { Controller ,Get ,Put ,Delete ,Post ,Query ,Body ,Param} from '@nestjs/common';
import { CreateSongDto } from './dtos/createSongDto.dto';
import { SongService } from './song.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Song } from './entities/song.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dtos/updateSongDto';

@Controller('song')
@ApiTags('song')
export class SongController {
    constructor(private songService:SongService){}

    @Get("/AllSongs")
    async getAllSong(@Query('limit') limit:number=5,@Query('skip') skip:number=0):Promise<Song[]>{
        return await  this.songService.getAllSongs(limit,skip)
    }

    @Get('/:id')
    async getSongById(@Param('id') songId:number){
        return await this.songService.getSongById(songId)
    }

    @Post("/addSong")
    async createSong(@Body('createSongDto') createSongDto:CreateSongDto):Promise<InsertResult>{
        return await this.songService.createSong(createSongDto)
    }

    @Put('updateSong/:id')
    async updateSong(@Param('id') songId:number,@Body('updateSongDto') updateSongDto:UpdateSongDto):Promise<UpdateResult>{
        return await this.songService.updateSongById(updateSongDto,songId)
    }

    @Delete('deleteSong/:id')
    async deleteSong(@Param('id') songId:number):Promise<DeleteResult>{
        return await this.songService.deleteSongById(songId)
    }

    @Post(':songId/saveToFavoriteList/:favoriteId')
    async saveToFavoirteList(@Param() songId:number,@Param()favoriteId:number){
        return await this.songService.pushToFavoriteService(songId,favoriteId)
    }

    @Post(':songId/saveToPlaylist/:playlistId')
    async saveToPlaylist(@Param() songId:number,@Param()playlistId:number){
        return await this.songService.pushToPlaylist(songId,playlistId)
    }
}
