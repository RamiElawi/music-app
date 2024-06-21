import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { PlayListRepository } from './playlist.repository';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TrakModule } from '../trak/trak.module';
@Module({
    imports:[TypeOrmModule.forFeature([PlayListRepository]),TrakModule],
    exports:[PlaylistService],
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule {}
