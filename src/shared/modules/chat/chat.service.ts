import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from 'src/modules/auth/entities/user.entity';
import { ChatRepository } from './chat.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UserJoinRoomRepository } from './joinRoom.repository';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(ChatRepository) private readonly chatRepo:ChatRepository,
    @InjectRepository(UserJoinRoomRepository) private readonly userRoomRepo:UserJoinRoomRepository,
  ){}

  async createChat (createChatDto: CreateChatDto,user:User):Promise<InsertResult> {
    return await this.chatRepo.createNewChat(createChatDto,user.username)
  }

  async getChats(currentUser:User):Promise<Chat[]>{
      return await this.chatRepo.getChats(currentUser.id)
  }

  async findOne(id: number):Promise<Chat> {
    const chat= await this.chatRepo.getChat(id)
    if(!chat) throw new NotFoundException('this chat is not found')
    return chat
  }

  async update(id: number, updateChatDto: UpdateChatDto):Promise<UpdateResult> {
    await this.findOne(id)
    return await this.chatRepo.updateChat(updateChatDto,id)
  }

  async remove(id: number) :Promise<DeleteResult>{
    await this.findOne(id)
    return await this.chatRepo.deleteChat(id)
  }

  async addUserToRoom(chatId:number,userId:number){
    return await this.userRoomRepo.addUser(chatId,userId)
  }

  async deleteUserFromRoom(chatId:number,userId:number){
    return await this.userRoomRepo.deleteUser(chatId,userId)
  }

  async getAllUserInRoom(chatId:number){
    return await this.userRoomRepo.getAllUserInRoom(chatId)
  }

}
