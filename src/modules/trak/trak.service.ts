import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './trak.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../song/entities/song.entity';
import { Music } from '../music/entities/music.entity';
import { Favorite } from '../favorite/entities/favorite.entity';
import { Trak } from './entities/trak.entity';
import { PlayList } from '../playlist/entities/playlist.entity';

@Injectable()
export class TrakService {
    constructor(
        @InjectRepository(TrackRepository) private readonly trakRepo:TrackRepository
    ){}

    async pushToFavoriteList(song:Song,music:Music,favorite:Favorite){
        let trak=new Trak()
        trak=await this.checkTrackType(trak,song,music)
        trak.favorite=favorite;
        return await trak.save()

    }

    async pushToPlayList(song:Song,music:Music,playList:PlayList){
        let trak=new Trak()
        trak=await this.checkTrackType(trak,song,music)
        trak.playList=playList
        return await trak.save()
    }

    async getTrak(trakId:number){
        const trak=await this.trakRepo.getTrak(trakId)
        if(!trak) throw new NotFoundException('this trak is not found')
        return trak
    }

    async deleteTrak(trakId:number){
        await this.getTrak(trakId)
        return await this.trakRepo.deleteTrak(trakId)
    }

    async checkTrackType(trak:Trak,song:Song,music:Music){
        if(song){
            trak.song=song;
            trak.title=song.name;
            trak.link=song.sourse
        }else if(music){
            trak.music=music;
            trak.title=music.name;
            trak.link=music.sourse
        }
        return trak;
    }
}
