import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Musicion } from "./entities/musicion.entity";
import { gender } from "src/common/enums/gender.enum";
import dataSource from "db/dataSource";
import { UpdateMusicionDto } from "./dtos/updateMusicionDto.dto";
import { artistType } from "src/common/enums/artist.enum";
import { CreateMusicionDto } from "./dtos/createMusicionDto.dto";

@EntityRepository(Musicion)
export class MusicianRepository extends Repository<Musicion>{
    
    async addMusicionRe(createMusicionDto:CreateMusicionDto):Promise<InsertResult>{
        return await dataSource.
        createQueryBuilder() 
        .insert()
        .into(Musicion)
        .values({...createMusicionDto})
        .execute()
    }

    async updateMusicionRe(musicionId:number,updateMusicionDto:UpdateMusicionDto):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(Musicion)
        .set({...updateMusicionDto})
        .where('musicions.id = :musicionId',{musicionId})
        .execute()
    }

    async deleteMusicionRe(musicionId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Musicion)
        .where('musicions.id = :musicionId',{musicionId})
        .execute()
    }

    async getMusicionRe(take:number,skip:number):Promise<Musicion[]>{
        return await dataSource
        .getRepository(Musicion)
        .createQueryBuilder('musicions')
        .limit(take)
        .offset(skip)
        .leftJoinAndSelect('musicions.MusicianAlbums','MusicianAlbum')
        .getMany()
    }

    async getMusicionIdRe(musicionId:number):Promise<Musicion>{
        return await dataSource
        .getRepository(Musicion)
        .createQueryBuilder('musicions')
        .where("musicions.id = :musicionId",{musicionId})
        .getOne()
    }

    async getMusicionByName(name:string):Promise<Musicion>{
        return await dataSource
        .getRepository(Musicion)
        .createQueryBuilder('musicions')
        .where('musicions.name = :name',{name})
        .getOne()
    }

    async filterMusicionRe(take?:number,nationality?:string,type?:artistType,gender?:gender):Promise<Musicion[]>{
        const query= dataSource.getRepository(Musicion).createQueryBuilder('musicions')
        if(nationality){
            query.where('musicions.nationality LIKE :nationality',{nationality})
        }
        if(type){
            query.where('musicions.nationality LIKE :type',{type})
        }
        if(gender){
            query.where('musicions.nationality LIKE :gender',{gender})
        }
        return query
        .limit(take)
        .leftJoinAndSelect('musicions.MusicianAlbums','MusicianAlbum')
        .getMany()
    }

}