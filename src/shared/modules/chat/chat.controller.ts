import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from 'src/modules/auth/entities/user.entity';
import { currentUser } from 'src/common/decorators/currentUser.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto,@currentUser() currentUser:User) {
    return this.chatService.createChat(createChatDto,currentUser);
  }

  @Post('/joinUsers/:chatId')
  async joinUser(@Param('chatId') chatId:number,@currentUser() currentUser:User){
    return await this.chatService.addUserToRoom(chatId,currentUser.id)
  }

  @Get('/getuserInRoom/:chatId')
  async getAllUserInRoom(@Param('chatId') chatId:number){
    return await this.chatService.getAllUserInRoom(chatId)
  }

  @Get()
  async getAllUserChat(@currentUser() currentUser:User) {
    return await this.chatService.getChats(currentUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.chatService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chatService.remove(+id);
  }

  @Delete('deleteUserFromRoom/:chatId')
  async deleteuserFromRoom(@Param('chatId') chatId:number,@currentUser() currentUser:User){
    return await this.chatService.deleteUserFromRoom(chatId,currentUser.id)
  }
}
