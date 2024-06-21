import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicianAlbumRepository } from './musician-album.repository';
import { MusicianAlbum } from './entities/musician-album.entity';
import { CreateMusicianAlbumDto } from './dtos/createMusicianAlbumDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateMusicianAlbumDto } from './dtos/updateMusicianAlbumDto.dto';

@Injectable()
export class MusicianAlbumService {
    constructor(@InjectRepository(MusicianAlbumRepository) private readonly mAlbumRepository:MusicianAlbumRepository){}

    async getMAlbumByName(name:string):Promise<MusicianAlbum>{
        const mAlbum=await this.mAlbumRepository.getMAlubmByName(name)
        if(mAlbum) throw new BadRequestException("this musician album is already exist")
        return mAlbum
    }

    async getMAlbumById(mAlbumId:number):Promise<MusicianAlbum>{
        const mAlbum=await this.mAlbumRepository.getMusicianAlbumId(mAlbumId);
        if(!mAlbum) throw new NotFoundException(`musician album with this id ${mAlbumId} is not exist`)
        return mAlbum;
    }

    async addMAlbum(createMusicianAlbum:CreateMusicianAlbumDto):Promise<InsertResult>{
        await this.getMAlbumByName(createMusicianAlbum.name)
        return await this.mAlbumRepository.createMusicianAlbum(createMusicianAlbum)
    }

    async getMAlbums(limit:number,skip:number):Promise<MusicianAlbum[]>{
        return await this.mAlbumRepository.getMusicianAlbums(limit,skip)
    }

    async updateMAlbum(mAlbumId:number,updateMusicianAlbum:UpdateMusicianAlbumDto):Promise<UpdateResult>{
        await this.getMAlbumById(mAlbumId)
        await this.getMAlbumByName(updateMusicianAlbum.name)
        return await this.mAlbumRepository.updateMusicianAlbum(mAlbumId,updateMusicianAlbum)
    }

    async deleteMAlbum(mAlbumId:number):Promise<DeleteResult>{
        await this.getMAlbumById(mAlbumId)
        return await this.mAlbumRepository.deleteMusicianAlbum(mAlbumId)
    }
}
