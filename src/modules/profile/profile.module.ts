import { Module } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import {TypeOrmModule} from '@nestjs/typeorm' 
import { FavoriteModule } from '../favorite/favorite.module';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { ProfileController } from './profile.controller';
@Module({
    imports:[
        TypeOrmModule.forFeature([Profile]),
        FavoriteModule
    ],
    controllers:[ProfileController],
    providers:[ProfileService,ProfileRepository],
    exports:[ProfileService]
})
export class ProfileModule {}
