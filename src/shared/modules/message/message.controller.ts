import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import { User } from 'src/modules/auth/entities/user.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':chatId/sendMessage')
  async create(@Body() createMessageDto: CreateMessageDto,@Param('chatId') chatId:number,@currentUser() user:User){
    return await this.messageService.create(createMessageDto,user.id,chatId);
  }

  @Get(':chatId/getAllMessage')
  async findAll(@Param('chatId') chatId:number) {
    return await this.messageService.getMessageRoom(chatId);
  }


  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messageService.deleteMessage(+id);
  }
}
