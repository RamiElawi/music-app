import { NotificationData } from "src/common/class/notificationData";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Notification } from "./notification.entity";
import { SubscriberEntity } from "./subscriber.entity";

@Entity('subscriberNotification')
export class SubscriberNotificationEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number 
  
  @Column()
  title:string

  @Column()
  body:string

  @Column('simple-json')
  data:NotificationData

  @Column({type:"jsonb",array:false})
  actions:Array<{title:string,action:string}>

  @Column('int',{array:true})
  vibrate:Array<number>

  @ManyToOne(type=>Notification,notification=>notification.subscriberNotifications)
  notification:Notification

  @ManyToOne(type=>SubscriberEntity,sub=>sub.subscriberNotifications)
  subscirber:SubscriberEntity
}