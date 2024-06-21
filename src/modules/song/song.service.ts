import { Injectable ,NotFoundException } from '@nestjs/common';
import { SongRepository } from './song.repository';
import { CreateSongDto } from './dtos/createSongDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dtos/updateSongDto';
import { FavoriteService } from '../favorite/Favorite.service';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable()
export class SongService {
    constructor(
        private songRepository:SongRepository,
        private favoriteService:FavoriteService,
        private playlistService:PlaylistService
    ){}

    async getAllSongs(limit:number=5,offset:number=0){
        return await this.songRepository.getSongs(limit,offset)
    }

    async getSongById(songId:number){
        const song=await this.songRepository.getSongById(songId)
        if(!song){
            throw new NotFoundException()
        }
        return song;
    }

    async createSong(createSongDto:CreateSongDto):Promise<InsertResult>{
        return await this.songRepository.creatSong(createSongDto)
    }

    async updateSongById(updateSongDto:UpdateSongDto,songId:number):Promise<UpdateResult>{
        await this.getSongById(songId)
        return await this.songRepository.updateSong(updateSongDto,songId)
    }

    async deleteSongById(songId:number):Promise<DeleteResult>{
        await this.getSongById(songId)
        return await this.songRepository.deleteSong(songId)
    }

    async pushToFavoriteService(songId:number,favoriteId:number){
        const song=await this.getSongById(songId)
        const trak=await this.favoriteService.createFavortieTrak(song,null,favoriteId)
        return trak;
    }

    async pushToPlaylist(songId:number,playlistId:number){
        const song=await this.getSongById(songId)
        const trak=await this.favoriteService.createFavortieTrak(song,null,playlistId)
        return trak;
    }

}
