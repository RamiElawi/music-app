import { Profile } from '../../profile/entities/profile.entity';
import { Trak } from '../../trak/entities/trak.entity';
import {Entity,PrimaryGeneratedColumn,Column,OneToOne,OneToMany, BaseEntity} from 'typeorm' 
@Entity()
export class Favorite extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    

    @OneToOne(type=>Profile,profile=>profile.favorite)
    profile:Profile
    @OneToMany(type=>Trak,trak=>trak.favorite)
    traks:Trak[]
}