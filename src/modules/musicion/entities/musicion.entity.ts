import { MusicianAlbum } from '../../musician-album/entities/musician-album.entity';
import {Entity, OneToMany} from 'typeorm'
import { BaseArtist } from 'src/common/class/abstract.entity';

@Entity('musicions')
export class Musicion extends BaseArtist{
    
    @OneToMany(type=>MusicianAlbum,musicianAlbum=>musicianAlbum.musician,{eager:true})
    MusicianAlbums:MusicianAlbum[]
}