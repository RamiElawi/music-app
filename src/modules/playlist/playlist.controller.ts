import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import { User } from '../auth/entities/user.entity';
import { PlaylistDto } from './dto/playlistDto.dto';
import { updatePlayListDto } from './dto/updatePlaylistDto.dto';
import { PlaylistService } from './playlist.service';
import {ApiTags} from '@nestjs/swagger'

@Controller('playlist')
@ApiTags('playlist')
export class PlaylistController {
    constructor(
        private readonly playlistService:PlaylistService
    ){}
    @Get("/userPlaylists")
    async getAllUserPlaylist(@currentUser() user:User,limit:number,skip:number){
        return await this.playlistService.getAllUserPlaylist(limit,skip,user)
    }

    @Get('/:id')
    async getPlayList(@Param('id') id:number){
        return await this.playlistService.getPlaylist(id)
    }

    @Post('/newPlaylist')
    async newPlayList(@Body() playList:PlaylistDto,@currentUser() user:User){
        return await this.playlistService.createPlaylist(playList,user)
    }
    
    @Patch('/:id')
    async updatePlayList(@Body() updatePlaylist:updatePlayListDto,@Param('id') id:number){
        return await this.playlistService.updatePlaylist(updatePlayListDto,id)
    }

    @Delete(':id')
    async deletePlaylist(@Param('id') id:number){
        return await this.playlistService.deletePlayList(id)
    }

    @Delete(':id/clearPlayList')
    async clearPlayList(@Param('id') id:number){

    }

    @Delete(':playlistId/removeTrackfromPlaylist/:trackId')
    async removeTrackfromPlaylist(@Param('playlistId') playlistId:number,@Param('trackId') trackId:number){
        
    }
}
