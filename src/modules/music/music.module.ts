import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicRepository } from './music.repository';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { Music } from './entities/music.entity';
import { FavoriteModule } from '../favorite/favorite.module';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
    imports:[TypeOrmModule.forFeature([Music]),FavoriteModule,PlaylistModule],
    exports:[],
    controllers: [MusicController],
    providers: [MusicService,MusicRepository]
})

export class MusicModule {}
