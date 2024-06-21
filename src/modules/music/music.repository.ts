import { EntityRepository, Repository,DataSource, DeleteResult } from "typeorm";
import { Music } from "./entities/music.entity";
import { musicType } from "src/common/enums/musicType.enum";
import {Injectable} from '@nestjs/common'
import { CreateMusicDto } from "./dtos/createMusicDto.dto";
import { UpdateMusicDto } from "./dtos/updateMusicDto.dto";
import dataSource from "db/dataSource";

@EntityRepository(Music)
export class MusicRepository extends Repository<Music>{
    
    async getMusics(limit:number,offset:number):Promise<Music[]>{
        return await dataSource
        .getRepository(Music)
        .createQueryBuilder('musics')
        .limit(limit)
        .offset(offset)
        .leftJoinAndSelect('musics.traks','traks')
        .getMany()
    }

    async getMusicById(musicId:number){
        return await dataSource
        .getRepository(Music)
        .createQueryBuilder('musics')
        .where('musics.id = :musicId',{musicId})
        .getOne()
    }

    async createMusic(createMusicDto:CreateMusicDto){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Music)
        .values([{...createMusicDto}])
        .execute()

    }

    async updateMusic(updaetMusicDto:UpdateMusicDto,musicId:number){
        return await dataSource
        .createQueryBuilder()
        .update()
        .set({...updaetMusicDto})
        .where("musics.id = :musicId",{musicId})
        .execute()
    }
    
    async deleteMusic(musicId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Music)
        .where("musics.id = :musicId",{musicId})
        .execute()
    }

    async getFilterMusics(limit:number=5,type:musicType,rate:number):Promise<Music[]>{
        const query=await dataSource.getRepository(Music).createQueryBuilder('musics')
        if(limit){
            query.limit(limit)
        }
        if(type){
            query.where('musics.type LIKE :type',{type})
        }
        if(rate){
            query.andWhere('musics.rate = :rate',{rate})
        }
        return await query.leftJoinAndSelect('musics.traks','trak').getMany()
    }

}