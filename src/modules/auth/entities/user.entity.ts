'use strict';
import { Auth } from 'src/common/class/auth';
import { role } from 'src/common/enums/role.enum';
import { Profile } from '../../profile/entities/profile.entity';
import { PlayList } from '../../playlist/entities/playlist.entity';
import {Entity,Column,PrimaryGeneratedColumn,Unique,OneToOne,JoinColumn,OneToMany, BaseEntity} from 'typeorm'
import { Message } from 'src/shared/modules/message/entities/message.entity';
import { UserJoinRoom } from 'src/shared/modules/chat/entities/userJoinRoom.entity';
import { SubscriberEntity } from 'src/modules/notification/entities/subscriber.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    username:string;
    @Column()
    email:string;
    @Column({nullable:true})
    password:string;
    @Column({nullable:true})
    salt:string;
    @Column({
        type:'enum',
        enum:role,
        array:true
    })
    roles:role[]

    @Column({default:false})
    isEmailVerified:boolean

    @Column({nullable:true})
    googleId:string

    @Column({nullable:true})
    facebookId:string

    @Column('simple-json')
    auth:Auth

    @OneToOne(type=>Profile,prfile=>prfile.user)
    @JoinColumn()
    profile:Profile

    @Column()
    profileId:number

    @OneToMany(type=>PlayList,playList=>playList.user,{eager:true})
    playLists:PlayList[]

    @OneToMany(type=>Message,message=>message.user,{eager:true})
    messages:Message[]

    @OneToMany(type=>UserJoinRoom,userJR=>userJR.user,{eager:true})
    userJoinRooms:UserJoinRoom[]

    @OneToOne(type=>SubscriberEntity,sub=>sub.user)
    subscriber:SubscriberEntity

    @Column({nullable:true})
    subscriberId:number
}