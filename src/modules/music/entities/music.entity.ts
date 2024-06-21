import { musicType } from 'src/common/enums/musicType.enum';
import { MusicianAlbum } from '../../musician-album/entities/musician-album.entity';
import { Trak } from '../../trak/entities/trak.entity'; 
import {Entity,PrimaryGeneratedColumn,Column,OneToMany, ManyToOne} from 'typeorm'
import { BaseMusic } from 'src/common/class/abstract-music.entity';

@Entity('musics')
export class Music extends BaseMusic{


    @ManyToOne(type=>MusicianAlbum,musicianAlbum=>musicianAlbum.musics,{eager:false})
    musicianAlbum:MusicianAlbum;
    @Column()
    musicianAlbumId:number
    @OneToMany(type=>Trak,trak=>trak.music)
    traks:Trak[]
}
