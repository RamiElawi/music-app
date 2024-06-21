import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { SubscriberEntity } from './entities/subscriber.entity';
import { SubscriberNotificationEntity } from './entities/sub-not.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notification,SubscriberEntity,SubscriberNotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
