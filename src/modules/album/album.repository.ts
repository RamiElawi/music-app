import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Album } from "./entities/album.entity";
import dataSource from "db/dataSource";
import { CreateAlbumDto } from "./dtos/createAlbumDto.dto";
import { UpdateAlbumDto } from "./dtos/updateAlbumDtl.dto";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album>{


    async getAlbums(limit:number,skip:number):Promise<Album[]>{
        return await dataSource
        .getRepository(Album)
        .createQueryBuilder("albums")
        .limit(limit)
        .offset(skip)
        .getMany()
    }

    async getAlbumById(albumId:number):Promise<Album>{
        return await dataSource
        .getRepository(Album)
        .createQueryBuilder('albums')
        .where('albums.id = :albumId',{albumId})
        .getOne()
    }

    async getAlbumByName(name:string):Promise<Album>{
        return await dataSource
        .getRepository(Album)
        .createQueryBuilder('albums')
        .where("albums.name like :name",{name})
        .getOne()
    }

    async createAlbum(createAlbum:CreateAlbumDto):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Album)
        .values({...createAlbum})
        .execute()
    }

    async updateAlbum(albumId:number,updateAlbum:UpdateAlbumDto):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(Album)
        .set({...updateAlbum})
        .where("albums.id = :albumId",{albumId})
        .execute()
    }

    async deleteAlbum(albumId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Album)
        .where("albums.id = :albumId",{albumId})
        .execute()
    }
}