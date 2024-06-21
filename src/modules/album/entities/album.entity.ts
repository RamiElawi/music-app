import { BaseAlbum } from 'src/common/class/abstract-album.entity';
import { Singer } from '../../singer/entities/singer.entity';
import { Song } from '../../song/entities/song.entity';
import {Entity, OneToMany,ManyToOne,Column} from 'typeorm'
@Entity('albums')
export class Album extends BaseAlbum{
    
    @ManyToOne(type=>Singer,singer=>singer.albums)
    singer:Singer
    @Column()
    singerId:number;

    @OneToMany(type=>Song,song=>song.album)
    songs:Song[];
}
