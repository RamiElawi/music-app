import {BadRequestException, Injectable ,NotFoundException, UseInterceptors} from '@nestjs/common'
import { SingerRepository } from './singer.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateSingerDto } from './dtos/createSingerDto.dto'
import { UpdateSingerDto } from "./dtos/updateSingerDto.dto"
import { Singer } from './entities/singer.entity'
import { artistType } from 'src/common/enums/artist.enum'
import { gender } from 'src/common/enums/gender.enum'
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'

@Injectable()
export class SingerService{
    constructor(
        @InjectRepository(SingerRepository) private singerRepository:SingerRepository
    ){}

    async getSingerId(singerId:number):Promise<Singer>{
        const singer = await this.singerRepository.getSingerById(singerId)
        if(!singer){
           throw new NotFoundException(`singer with this id ${singerId} is not found`)
        }
         return singer;
    }

    async getSingerByName(name:string):Promise<Singer>{
        return await this.singerRepository.getSingerByName(name);
    }

   
    async createSinger(createSingerDto:CreateSingerDto,image:string):Promise<InsertResult>{
        const singer=await this.getSingerByName(createSingerDto.name);
        if(singer) throw new BadRequestException("this singer is already exist");
        return await this.singerRepository.createSingerRe(createSingerDto,image)
    }

    async getSingers(limit:number=5,skip:number=0):Promise<Singer[]>{
        return this.singerRepository.getSingers(limit,skip);
    }

    async updateSingerById(singerId: number,updateSingerDto:UpdateSingerDto,image:string):Promise<UpdateResult>{
        await this.getSingerId(singerId)
        const singer =await this.getSingerByName(updateSingerDto.name)
        if(singer) throw new BadRequestException('this singer is already exist')
        return this.singerRepository.updateSinger(singerId,updateSingerDto,image)
    }

    async deleteSingerById(singerId:number):Promise<DeleteResult>{
        await this.getSingerId(singerId);
        return await this.singerRepository.deleteSinger(singerId)
    }

    async getFilterSinger(take?:number,nationality?:string,type?:artistType,gender?:gender):Promise<Singer[]>{
        return await this.singerRepository.filterSinger(take,nationality,type,gender);
    }

}