import { Singer } from '../../singer/entities/singer.entity';
import { Musicion } from '../../musicion/entities/musicion.entity';
import { Music } from '../../music/entities/music.entity';
import {Entity,OneToMany,ManyToOne,Column} from 'typeorm';
import { BaseAlbum } from 'src/common/class/abstract-album.entity';
@Entity('musicianAlbums')
export class MusicianAlbum extends BaseAlbum{
    

    @ManyToOne(type=>Musicion,musicion=>musicion.MusicianAlbums,{eager:false})
    musician:Musicion
    @Column()
    musicianId:number
    @OneToMany(type=>Music,music=>music.musicianAlbum,{eager:true})
    musics:Music[];
}
