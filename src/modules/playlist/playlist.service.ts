import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { PlayListRepository } from './playlist.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from './entities/playlist.entity';
import { PlaylistDto } from './dto/playlistDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { updatePlayListDto } from './dto/updatePlaylistDto.dto';
import { Song } from '../song/entities/song.entity';
import { Music } from '../music/entities/music.entity';
import { TrakService } from '../trak/trak.service';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(PlayListRepository) private readonly playListRepo:PlayListRepository,
        private readonly trakService:TrakService
    ){}
    async getAllUserPlaylist(limit:number,skip:number,user:User){
        return await this.playListRepo.getPlayList(limit,skip,user.id)
    }

    async getPlaylist(playlistId:number):Promise<PlayList>{
        const playList=await this.playListRepo.getPlaylistById(playlistId)
        if(!playList) throw new NotFoundException('this play list is not found')
        return playList
    }

    async createPlaylist(playlistDto:PlaylistDto,user:User):Promise<InsertResult>{
        return await this.playListRepo.createPlayList(playlistDto,user)
    }

    async updatePlaylist(updatePlaylistDto:updatePlayListDto,playlistId:number):Promise<UpdateResult>{
        await this.getPlaylist(playlistId)
        return await this.playListRepo.updatePlayList(updatePlaylistDto,playlistId)
    }

    async deletePlayList(playlistId:number):Promise<DeleteResult>{
        await this.getPlaylist(playlistId)
        return await this.playListRepo.deletePlaylist(playlistId)
    }
    async createPlaylistTrak(song:Song,music:Music,playlistId:number){
        const playlist=await this.getPlaylist(playlistId)
        const trak=await this.trakService.pushToPlayList(song,music,playlist)
        return trak;
    }
}
