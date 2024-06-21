import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepositroy } from './message.repository';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(MessageRepositroy) private readonly messageRepo:MessageRepositroy
  ){}

  async create(createMessageDto: CreateMessageDto,userId:number,chatId:number) {
    return await this.messageRepo.addMessage(createMessageDto,userId,chatId)
  }

  async getMessageRoom(chatId:number) {
    return await this.messageRepo.getRoomMessage(chatId)
  }
  
  async deleteMessage(messageId: number) {
    return await this.messageRepo.deleteMessage(messageId)
  }
}
