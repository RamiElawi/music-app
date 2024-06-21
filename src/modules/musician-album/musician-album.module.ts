import { Module } from '@nestjs/common';
import { MusicianAlbum } from './entities/musician-album.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { MusicianAlbumController } from './musician-album.controller';
import { MusicianAlbumService } from './musician-album.service';
import { MusicianAlbumRepository } from './musician-album.repository';
@Module({
    imports:[TypeOrmModule.forFeature([MusicianAlbum])],
    exports:[],
    controllers: [MusicianAlbumController],
    providers: [MusicianAlbumService,MusicianAlbumRepository]
})
export class MusicianAlbumModule {}
