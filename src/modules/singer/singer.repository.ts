import { Repository ,EntityRepository,DataSource, DeleteResult, UpdateResult, InsertResult, getRepository} from "typeorm";
import { Singer } from "./entities/singer.entity";
import { gender } from "src/common/enums/gender.enum";
import { CreateSingerDto } from "./dtos/createSingerDto.dto";
import { UpdateSingerDto } from "./dtos/updateSingerDto.dto";
import { artistType } from "src/common/enums/artist.enum";
import dataSource from "db/dataSource";
@EntityRepository(Singer)
export class SingerRepository extends Repository<Singer>{

    async getSingers(take:number=5,skip:number=0):Promise<Singer[]>{
        return await dataSource
        .getRepository(Singer)
        .createQueryBuilder('singers')
        .limit(take)
        .offset(skip)
        .leftJoinAndSelect('singers.albums','Album')
        .getMany()
    }

    async getSingerByName(name:string):Promise<Singer>{
        return await dataSource
        .getRepository(Singer)
        .createQueryBuilder('singers')
        .where('singers.name = :name',{name:name})
        .getOne()
    }

    async getSingerById(id:number):Promise<Singer>{
        return await dataSource
        .getRepository(Singer)
        .createQueryBuilder('singers')
        .where("singers.id = :id",{id})
        .getOne()
    }

    async createSingerRe(createSingerDto:CreateSingerDto,image:string):Promise<InsertResult>{
        const imagePath=`http://localhost:8000/${image}`;
        const singer=await dataSource.createQueryBuilder()
        .insert()
        .into(Singer)
        .values([{...createSingerDto,image:imagePath}])
        .execute()
        return singer;
    }

    async filterSinger(take?:number,nationality?:string,type?:artistType,gender?:gender):Promise<Singer[]>{
        const query= await dataSource
        .getRepository(Singer)
        .createQueryBuilder('singers')
        if(nationality){
            query.where('singers.nationality LIKE :nationality',{nationality})
        }
        if(type){
            query.andWhere('singers.nationality LIKE :type',{type})
        }
        if(gender){
            query.andWhere('singers.nationality LIKE :gender',{gender})
        }
        return query
        .limit(take)
        .leftJoinAndSelect('singers.albums','Album')
        .getMany()
    }


    async updateSinger(singerId:number,updateSingerDto:UpdateSingerDto,image:string):Promise<UpdateResult>{
        const imagePath=`http://localhost:8000/${image}`
        return await  dataSource
        .createQueryBuilder()
        .update(Singer)
        .set({...updateSingerDto,imagePath})
        .where("singers.id = :singerId",{singerId})
        .execute()
    }

    async deleteSinger(singerId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Singer)
        .where("singers.id = :singerId",{singerId})
        .execute()
    }

}
