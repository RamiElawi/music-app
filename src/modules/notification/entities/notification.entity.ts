import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriberNotificationEntity } from "./sub-not.entity";

@Entity('notification')
export class Notification extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    body:string


    @OneToMany(type=>SubscriberNotificationEntity,subNot=>subNot.notification,{eager:true})
    subscriberNotifications:SubscriberNotificationEntity[]
}
