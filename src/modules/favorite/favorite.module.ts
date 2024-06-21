import { Module } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { FavoriteService } from './Favorite.service';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteController } from './favorite.controller';
import { TrakModule } from '../trak/trak.module';
@Module({
    imports:[TypeOrmModule.forFeature([Favorite]),TrakModule],
    controllers:[FavoriteController],
    providers:[
        FavoriteService,
        FavoriteRepository
    ],
    exports:[FavoriteService]
})
export class FavoriteModule {}
