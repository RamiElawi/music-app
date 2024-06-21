import { Injectable, NotFoundException } from "@nestjs/common";
import { FavoriteRepository } from "./favorite.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { TrakService } from "../trak/trak.service";
import { Song } from "../song/entities/song.entity";
import { Music } from "../music/entities/music.entity";
import { Favorite } from "./entities/favorite.entity";

@Injectable()
export class FavoriteService{
    constructor(
        @InjectRepository(FavoriteRepository) private readonly favoirteRepositroy:FavoriteRepository,
        private readonly trakService:TrakService
    ){}

    async createFavorite(profile:Profile){
        return await this.favoirteRepositroy.createFavorite(profile)
    }

    async getFavoriteList(id:number,profile?:Profile){
        let favoriteList=await this.favoirteRepositroy.getFavoriteById(id);
        if(profile){
            favoriteList= await this.favoirteRepositroy.getFavoriteByProfile(profile)
        }

        if(!favoriteList) throw new NotFoundException('this favorite is not found')
        return favoriteList;
    }


    async clearFavoriteTrakContent(favoriteId:number){
        const favorite=await this.getFavoriteList(favoriteId)
        favorite.traks.forEach(async trak=>{
            await this.trakService.deleteTrak(trak.id)
        })
        favorite.traks=[];
        return await favorite.save();
    }

    async removeTrakfromFavorite(favoriteId:number,trakId:number){
        const favorite=await this.getFavoriteList(favoriteId)
        favorite.traks.forEach(async trak=>{
            if(trak.id == trakId)
                await this.trakService.deleteTrak(trakId)
        })
        favorite.traks=[];
        return await favorite.save();
    }

    async createFavortieTrak(song:Song,music:Music,favortieId:number){
        const favorite=await this.getFavoriteList(favortieId)
        const trak=await this.trakService.pushToFavoriteList(song,music,favorite)
        return trak;
    }
} 