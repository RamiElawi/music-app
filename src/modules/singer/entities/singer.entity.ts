import {Entity,ManyToOne,Column, OneToMany} from 'typeorm'
import { Album } from '../../album/entities/album.entity';
import { BaseArtist } from 'src/common/class/abstract.entity';


@Entity('singers')
export class Singer extends BaseArtist{
    
    @OneToMany(type=>Album,album=>album.singer)
    albums:Album[]
}