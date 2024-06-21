import { User } from  "../../auth/entities/user.entity"
import { Trak } from '../../trak/entities/trak.entity';
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'

@Entity()
export class PlayList{
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string

    @Column({
        default:new Date()
    })
    createdAt:Date
    
    @ManyToOne(type=>User,user=>user.playLists,{eager:false})
    user:User
    @Column()
    userId:number
    @OneToMany(type=>Trak,trak=>trak.playList)
    traks:Trak[]
}