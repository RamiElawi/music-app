import { Key } from "src/common/class/key";
import { User } from "src/modules/auth/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriberNotificationEntity } from "./sub-not.entity";

@Entity('subscriber')
export class SubscriberEntity extends BaseEntity{
 
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    endPoint:string

    @Column({nullable:true})
    expirationTime:Date

    @Column('simple-json')
    keys:Key

    @OneToOne(type=>User,user=>user.subscriber)
    user:User

    @OneToMany(type=>SubscriberNotificationEntity,subNOt=>subNOt.subscirber,{eager:true})
    subscriberNotifications:SubscriberNotificationEntity[]
}