import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm' 
import { SingerService } from './singer.service';
import { SingerRepository } from './singer.repository';
import { SingerController } from './singer.controller';
import { Singer } from './entities/singer.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports:[
        TypeOrmModule.forFeature([Singer]),
        AuthModule
    ],
    exports:[],
    providers:[SingerService,SingerRepository],
    controllers: [SingerController]
})
export class SingerModule {}
