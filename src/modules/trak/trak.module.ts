import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Trak } from './entities/trak.entity';
import { TrakController } from './trak.controller';
import { TrakService } from './trak.service';
import { TrackRepository } from './trak.repository';
@Module({
    imports:[TypeOrmModule.forFeature([Trak])],
    exports:[TrakService],
    controllers: [TrakController],
    providers: [TrakService,TrackRepository]
})
export class TrakModule {}
