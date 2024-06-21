import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../../message/entities/message.entity";
import { UserJoinRoom } from "./userJoinRoom.entity";

@Entity('chat')
export class Chat extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({
        default:new Date()
    })
    createdAt:Date
    @Column()
    createdBy:string   
    @Column({
        nullable:true
    })
    image:string

    @OneToMany(type=>Message,message=>message.chat,{eager:true})
    messages:Message[]

    @OneToMany(type=>UserJoinRoom,userJR=>userJR.chat,{eager:true})
    userJoinRooms:UserJoinRoom[]
}
