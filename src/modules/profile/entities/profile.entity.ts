import { gender } from "src/common/enums/gender.enum";
import { User } from "../../auth/entities/user.entity"
import { Favorite } from "../../favorite/entities/favorite.entity";
import { Trak } from "../../trak/entities/trak.entity";
import {Entity,Column,PrimaryGeneratedColumn,Unique,OneToOne, JoinColumn, BaseEntity} from 'typeorm'
@Entity('profiles')
@Unique(['phone'])
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column({
        type:'enum',
        enum:gender,
        nullable:true
    })
    gender:gender
    @Column({nullable:true})
    age:number
    @Column({nullable:true})
    country:string
    @Column({nullable:true})
    city:string
    @Column({nullable:true})
    address:string
    @Column({nullable:true})
    phone:string   
    @Column({
        nullable:true
    })
    image:string

    @OneToOne(type=>User,user=>user.profile)
    user:User
    @OneToOne(type=>Favorite,favorite=>favorite.profile)
    @JoinColumn()
    favorite:Favorite
    @Column()
    favoriteId:number
}