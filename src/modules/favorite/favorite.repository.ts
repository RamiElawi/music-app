import { EntityRepository, Repository } from "typeorm";
import { Favorite } from "./entities/favorite.entity";
import { CreateFavoriteDto } from "./dto/createFavoriteDto.dto";
import { Profile } from "../profile/entities/profile.entity";
import dataSource from "db/dataSource";


@EntityRepository(Favorite)
export class FavoriteRepository extends Repository<Favorite>{


    async createFavorite(profile:Profile):Promise<Favorite>{
        const favorite=new Favorite()
        favorite.profile=profile;
        favorite.traks=[]
        return await favorite.save()
    }

    async getFavoriteById(id:number){
        return await dataSource
        .getRepository(Favorite)
        .createQueryBuilder('favorite')
        .where('favortie.id = :id',{id})
        .getOne()
    }

    async getFavoriteByProfile(profile:Profile){
        return await dataSource
        .getRepository(Favorite)
        .createQueryBuilder('favorite')
        .where('favorite.profile = :profile',{profile})
        .getOne()
    }
}