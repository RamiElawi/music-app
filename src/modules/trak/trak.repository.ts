import { EntityRepository ,Repository} from "typeorm";
import { Trak } from "./entities/trak.entity";
import dataSource from "db/dataSource";

@EntityRepository(Trak)
export class TrackRepository extends Repository<Trak>{
    

    async getTrak(trakId:number){
        return await dataSource
        .getRepository(Trak)
        .createQueryBuilder('trak')
        .where('trak.id = :trakId',{trakId})
        .getOne()
    }

    async deleteTrak(trakId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Trak)
        .where('trak.id = :trakId',{trakId})
        .execute()
    }

}