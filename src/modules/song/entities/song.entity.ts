import { songType } from 'src/common/enums/song.enum';
import { songLanguage } from 'src/common/enums/songLanguage.enum';
import { Album } from '../../album/entities/album.entity';
import { Trak } from '../../trak/entities/trak.entity';
import {Entity,Column,OneToMany, ManyToOne} from 'typeorm'
import { BaseMusic } from 'src/common/class/abstract-music.entity';

@Entity()
export class Song extends BaseMusic{
    @Column({
        type:'enum',
        enum:songLanguage
    })
    language:songLanguage
    

    @ManyToOne(type=>Album,album=>album.songs)
    album:Album
    @OneToMany(type=>Trak,trak=>trak.song)
    traks:Trak[]
}