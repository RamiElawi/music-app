import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('subscribers')
  async getAllSubscriber(){

  }

  @Get(':subscriberId')
  async getSubscriberById(@Param('subscriberId') subscriberId:number){

  }

  @Post('newSubscriber')
  async newSubscriber(@currentUser() currentUser:User,@Body() subscribe:any){

  }

  @Post('sendNotification')
  async sendNotification(@Body()notificationPayload:CreateNotificationDto){

  }
}
