import { EntityRepository, Repository } from "typeorm";
import { UserJoinRoom } from "./entities/userJoinRoom.entity";
import dataSource from "db/dataSource";

@EntityRepository(UserJoinRoom)
export class UserJoinRoomRepository extends Repository<UserJoinRoom>{
    

    async addUser(chatId:number,userId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(UserJoinRoom)
        .values({chatId:chatId,userId:userId})
        .execute()
    }

    async deleteUser(chatId:number,userId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(UserJoinRoom)
        .where('userJoinRoom.chatId = :chatId',{chatId})
        .andWhere('userJoinRoom.userId = :userId',{userId})
        .execute()
    }

    async getAllUserInRoom(chatId:number){
        return await dataSource
        .getRepository(UserJoinRoom)
        .createQueryBuilder('userJoinRoom')
        .where('userJoinRoom.chatId = :chatId',{chatId})
        .leftJoinAndSelect('userJoinRoom.user','user')
        .getMany()
    }

    

}