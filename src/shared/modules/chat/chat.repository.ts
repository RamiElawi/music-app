import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Chat } from "./entities/chat.entity";
import dataSource from "db/dataSource";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat>{
    

    async getChats(userId:number):Promise<Chat[]>{
        return await dataSource
        .getRepository(Chat)
        .createQueryBuilder('chat')
        .where('chat.userId = :userId',{userId})
        .getMany()    
    }

    async getChat(chatId:number):Promise<Chat>{
        return await dataSource
        .getRepository(Chat)
        .createQueryBuilder('chat')
        .where('chat.id = :chatId',{chatId})
        .leftJoinAndSelect('chat.messages','messages')
        .getOne()
    }

    async createNewChat(createChat:CreateChatDto,username:string):Promise<InsertResult>{
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Chat)
        .values({...createChat,createdBy:username})
        .execute()
    }

    async updateChat(updateChat:UpdateChatDto,chatId:number):Promise<UpdateResult>{
        return await dataSource
        .createQueryBuilder()
        .update(Chat)
        .set({...updateChat})
        .where('chat.id = :chatId',{chatId})
        .execute()
    }

    async deleteChat(chatId:number):Promise<DeleteResult>{
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Chat)
        .where('chat.id = :chatId',{chatId})
        .execute()
    }
}