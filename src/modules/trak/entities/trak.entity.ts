import { PlayList } from '../../playlist/entities/playlist.entity'
import { Song } from '../../song/entities/song.entity'
import { Music } from '../../music/entities/music.entity'
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne, BaseEntity} from 'typeorm'
import { Favorite } from '../../favorite/entities/favorite.entity'
@Entity()
export class Trak extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    link:string
    
    @Column()
    index:number


    @ManyToOne(type=>PlayList,playList=>playList.traks)
    playList:PlayList;
    @Column()
    playListId:number
    @ManyToOne(type=>Favorite,favorite=>favorite.traks)
    favorite:Favorite;
    @Column()
    favoriteId:number
    @ManyToOne(type=>Song,song=>song.traks)
    song:Song;
    @Column()
    songId:number
    @ManyToOne(type=>Music,music=>music.traks)
    music:Music;
    @Column()
    musicId:number

    
}