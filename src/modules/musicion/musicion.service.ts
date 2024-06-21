import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
import { MusicianRepository } from './musician.repository';
import { CreateMusicionDto } from './dtos/createMusicionDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateMusicionDto } from './dtos/updateMusicionDto.dto';
import { Musicion } from './entities/musicion.entity';
import {gender} from 'src/common/enums/gender.enum'
import { artistType } from 'src/common/enums/artist.enum';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class MusicionService{
    constructor(
        @InjectRepository(MusicianRepository) private musicionRepository:MusicianRepository
    ){}   
    
    async findMusicionByName(name:string):Promise<Boolean>{
        const musicion=await this.musicionRepository.getMusicionByName(name)
        if(musicion) throw new BadRequestException('this musicion is already exist')
        return true;
    }

    async getMusicionById(musicionId:number):Promise<Musicion>{
        const musicion=await this.musicionRepository.getMusicionIdRe(musicionId)
        if(!musicion)throw new NotFoundException(`the musicion with this id ${musicionId} is not exist`)
        return musicion;
    }

    async addMusicion(createMusicionDto:CreateMusicionDto):Promise<InsertResult>{
        await this.findMusicionByName(createMusicionDto.name);
        return await this.musicionRepository.addMusicionRe(createMusicionDto)
    }

    async updateMusicion(musicionId:number,updateMusicionDto:UpdateMusicionDto):Promise<UpdateResult>{
        await this.getMusicionById(musicionId)
        await this.findMusicionByName(updateMusicionDto.name)
        return await this.musicionRepository.updateMusicionRe(musicionId,updateMusicionDto);
    }
    
    async deleteMusicion(musicionId:number):Promise<DeleteResult>{
        await this.getMusicionById(musicionId)
        return await this.musicionRepository.deleteMusicionRe(musicionId)
    }

    async getMusicions(take:number,skip:number):Promise<Musicion[]>{
        return await this.musicionRepository.getMusicionRe(take,skip)
    }

    async getFilterMusicion(take?:number,nationality?:string,type?:artistType,gender?:gender):Promise<Musicion[]>{
        return await this.musicionRepository.filterMusicionRe(take,nationality,type,gender)
    }
}
