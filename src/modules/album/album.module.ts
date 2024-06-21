import { Module } from '@nestjs/common';
import { Album } from './entities/album.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
@Module({
    imports:[TypeOrmModule.forFeature([Album])],
    exports:[],
    controllers: [AlbumController],
    providers: [AlbumService,AlbumRepository]
})
export class AlbumModule {}
