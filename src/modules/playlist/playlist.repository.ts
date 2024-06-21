import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { PlayList } from "./entities/playlist.entity";
import dataSource from "db/dataSource";
import { PlaylistDto } from "./dto/playlistDto.dto";
import { updatePlayListDto } from "./dto/updatePlaylistDto.dto";
import { User } from "../auth/entities/user.entity";

@EntityRepository(PlayList)
export class PlayListRepository extends Repository<PlayList>{
    async getPlayList(limit:number=5,skip:number=0,userId:number):Promise<PlayList[]>{
        return await dataSource
        .getRepository(PlayList)
        .createQueryBuilder('play_list')
        .where('play_list.userId = :userId',{userId})
        .limit(limit)
        .skip(skip)
        .leftJoinAndSelect('play_list.traks','trak')
        .getMany()
    }

    async getPlaylistById(playlistId:number):Promise<PlayList>{
        return await dataSource
        .getRepository(PlayList)
        .createQueryBuilder('play_list')
        .where('play_list.id = :playlistId',{playlistId})
        .getOne()
    }

    async createPlayList(playlistDto:PlaylistDto,user:User):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(PlayList)
        .values({...playlistDto,user})
        .execute()
    }

    async updatePlayList(updatePlayList:updatePlayListDto,playlistId:number):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(PlayList)
        .set({...updatePlayList})
        .where('play_list.id = :playlistId',{playlistId})
        .execute()
    }

    async deletePlaylist(playlistId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(PlayList)
        .where('play_list.id = :playlistId',{playlistId})
        .execute()
    }
}