import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dtos/createAlbumDto.dto';
import { UpdateAlbumDto } from './dtos/updateAlbumDtl.dto';


@Injectable()
export class AlbumService {
    constructor(@InjectRepository(AlbumRepository) private readonly albumRepository:AlbumRepository){}

    async getAlbum(albumId:number):Promise<Album>{
        const album=await this.albumRepository.getAlbumById(albumId);
        if(!album) throw new NotFoundException(`album with this id ${albumId} is not exist`)
        return album
    }
    
    async getAlbums(limit:number,skip:number):Promise<Album[]>{
        return await this.albumRepository.getAlbums(limit,skip);
    }

    async getAlbumByName(name:string):Promise<Album>{
        const album=await this.albumRepository.getAlbumByName(name);
        if(album)throw new BadRequestException("this album is already exist")
        return album;
    }

    async addAlbum(createAlbum:CreateAlbumDto):Promise<InsertResult>{
        await this.getAlbumByName(createAlbum.name)
        return await this.albumRepository.createAlbum(createAlbum)
    }

    async updateAlbum(updateAlbum:UpdateAlbumDto,albumId:number):Promise<UpdateResult>{
        await this.getAlbum(albumId);
        await this.getAlbumByName(updateAlbum.name);
        return await this.albumRepository.updateAlbum(albumId,updateAlbum)
    }

    async deleteAlbum(albumId:number):Promise<DeleteResult>{
        await this.getAlbum(albumId);
        return await this.albumRepository.deleteAlbum(albumId)
    }
}
