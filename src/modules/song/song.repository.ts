import { DataSource, DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Song } from "./entities/song.entity";
import { musicType } from "src/common/enums/musicType.enum";
import { Injectable} from "@nestjs/common"
import { CreateSongDto } from "./dtos/createSongDto.dto";
import { UpdateSongDto } from "./dtos/updateSongDto";
import dataSource from "db/dataSource";

@EntityRepository(Song)
export class SongRepository extends Repository<Song>{     

    async getSongs(limit:number,offset:number):Promise<Song[]>{
        return await dataSource
        .getRepository(Song)
        .createQueryBuilder('songs')
        .limit(limit)
        .offset(offset)
        .getMany()
    }


    async getSongById(songId:number):Promise<Song>{
        return await dataSource
        .getRepository(Song)
        .createQueryBuilder('songs')
        .where('songs.id = :songId',{songId})
        .getOne()
    }

    async creatSong(createSongDto:CreateSongDto):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Song)
        .values([{...createSongDto}])
        .execute()
    }
    async updateSong(updateSongDto:UpdateSongDto,songId:number):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(Song)
        .set({...updateSongDto})
        .where('songs.id = :songId',{songId})
        .execute()
    }
    async deleteSong(songId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Song)
        .where('songs.id = :songId',{songId})
        .execute()
    }
}