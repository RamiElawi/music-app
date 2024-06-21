import { User } from "src/modules/auth/entities/user.entity";
import { BaseEntity ,PrimaryGeneratedColumn,Column,Entity, ManyToOne} from "typeorm";
import { Chat } from "./chat.entity";

@Entity('userJoinRoom')
export class UserJoinRoom extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        default:new Date()
    })
    joinIn:Date

    @ManyToOne(type=>User,user=>user.userJoinRooms)
    user:User
    @Column()
    userId:number
    @ManyToOne(type=>Chat,chat=>chat.userJoinRooms)
    chat:Chat
    @Column()
    chatId:number


}