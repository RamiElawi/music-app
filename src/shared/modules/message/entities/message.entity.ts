import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";
import { User } from "src/modules/auth/entities/user.entity";

@Entity('message')
export class Message extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    text:string
    @Column()
    created:Date

    @ManyToOne(type=>Chat,chat=>chat.messages,{eager:false})
    chat:Chat
    @Column()
    chatId:number

    @ManyToOne(type=>User,user=>user.messages,{eager:false})
    user:User
    @Column()
    userId:number
}
