import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UserJoinRoom } from './entities/userJoinRoom.entity';
import { ChatRepository } from './chat.repository';
import { UserJoinRoomRepository } from './joinRoom.repository';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Chat,UserJoinRoom]),MessageModule,AuthModule],
  controllers: [ChatController],
  providers: [ChatService,ChatRepository,UserJoinRoomRepository, ChatGateway],
  exports:[ChatService]
})
export class ChatModule {}
