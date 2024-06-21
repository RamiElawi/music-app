import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicRepository } from './music.repository';
import { Music } from './entities/music.entity';
import { CreateMusicDto } from './dtos/createMusicDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateMusicDto } from './dtos/updateMusicDto.dto';
import { FavoriteService } from '../favorite/Favorite.service';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable()
export class MusicService {
    constructor(
        private readonly musicRepository:MusicRepository,
        private readonly favoriteService:FavoriteService,
        private readonly playlistService:PlaylistService
    ){}

    async getAllMusic(limit:number,offset:number):Promise<Music[]>{
        return await this.musicRepository.getMusics(limit,offset);
    }
    
    async getMusicById(musicId:number):Promise<Music>{
        const music =await this.musicRepository.getMusicById(musicId)
        if(!music)throw new NotFoundException(`the music with this id ${musicId} is not exist`)
        return music
    }

    async createMusic(createMusicDto:CreateMusicDto):Promise<InsertResult>{
        return await this.musicRepository.createMusic(createMusicDto);
    }

    async updateMusic(musicId:number,updateMusicDto:UpdateMusicDto):Promise<UpdateResult>{
        await this.getMusicById(musicId);
        return await this.musicRepository.updateMusic(updateMusicDto,musicId);
    }

    async deleteMusic(musicId:number):Promise<DeleteResult>{
        await this.getMusicById(musicId);
        return await this.musicRepository.deleteMusic(musicId);
    }

    async pushToFavoriteService(musicId:number,favoriteId:number){
        const music=await this.getMusicById(musicId)
        const trak=await this.favoriteService.createFavortieTrak(null,music,favoriteId)
        return trak;
    }

    async pushToPlaylist(musicId:number,playlistId:number){
        const music=await this.getMusicById(musicId)
        const trak=await this.playlistService.createPlaylistTrak(null,music,playlistId)
        return trak;
    }

    
}
