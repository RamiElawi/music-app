import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageRepositroy } from './message.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService,MessageRepositroy],
  exports:[MessageService]
})
export class MessageModule {}
