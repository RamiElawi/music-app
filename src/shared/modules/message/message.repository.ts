import { EntityRepository, Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import dataSource from "db/dataSource";

@EntityRepository(Message)
export class MessageRepositroy extends Repository<Message>{
    async addMessage(createMessage:CreateMessageDto,userId:number,chatId:number){
        return await dataSource
        .createQueryBuilder()
        .insert()
        .into(Message)
        .values({...createMessage,userId,chatId})
        .execute()
    }

    async deleteMessage(messageId:number){
        return await dataSource
        .createQueryBuilder()
        .delete()
        .from(Message)
        .where('message.id = :messageId',{messageId})
        .execute()
    }

    async getRoomMessage(chatId:number){
        return await dataSource
        .getRepository(Message)
        .createQueryBuilder('message')
        .where('message.chatId = :chatId',{chatId})
        .leftJoinAndSelect('message.user','user')
        .getMany()
    }
}