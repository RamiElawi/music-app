import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { MusicianAlbum } from "./entities/musician-album.entity";
import dataSource from "db/dataSource";
import { CreateMusicianAlbumDto } from "./dtos/createMusicianAlbumDto.dto";
import { UpdateMusicianAlbumDto } from "./dtos/updateMusicianAlbumDto.dto";

@EntityRepository(MusicianAlbum)
export class MusicianAlbumRepository extends Repository<MusicianAlbum>{

    async getMusicianAlbumId(mAlbumId:number):Promise<MusicianAlbum>{
        return await dataSource
        .getRepository(MusicianAlbum)
        .createQueryBuilder('musicianAlbums')
        .where("musicianAlbums.id = :mAlbumId",{mAlbumId})
        .getOne()
    }

    async getMusicianAlbums(limit:number,skip:number):Promise<MusicianAlbum[]>{
        return await dataSource
        .getRepository(MusicianAlbum)
        .createQueryBuilder('musicianAlbums')
        .limit(limit)
        .offset(skip)
        .getMany()
    }

    async createMusicianAlbum(createMusicianAlbum:CreateMusicianAlbumDto):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(MusicianAlbum)
        .values({...createMusicianAlbum})
        .execute()
    }

    async updateMusicianAlbum(mAlbumId:number,updateMusicianAlbum:UpdateMusicianAlbumDto):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(MusicianAlbum)
        .set({...updateMusicianAlbum})
        .where('musicianAlbums.id = :mAlbumId',{mAlbumId})
        .execute()
    }

    async deleteMusicianAlbum(mAlbumId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(MusicianAlbum)
        .where('musicianAlbums.id = :mAlbumId',{mAlbumId})
        .execute()
    }

    async getMAlubmByName(name:string):Promise<MusicianAlbum>{
        return await dataSource
        .getRepository(MusicianAlbum)
        .createQueryBuilder('musicianAlbums')
        .where('musicianAlbums.name like :name',{name})
        .getOne()
    }
    
} 