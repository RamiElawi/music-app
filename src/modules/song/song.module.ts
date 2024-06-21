import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { SongRepository } from './song.repository';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Song } from './entities/song.entity';
import { FavoriteModule } from '../favorite/favorite.module';
import { PlaylistModule } from '../playlist/playlist.module';
@Module({
    imports:[TypeOrmModule.forFeature([SongRepository]),FavoriteModule,PlaylistModule],
    exports:[],
    controllers: [SongController],
    providers: [SongService,SongRepository]
})
export class SongModule {}
