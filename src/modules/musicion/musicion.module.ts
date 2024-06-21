import { Module } from '@nestjs/common';
import { MusicionService } from './musicion.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { MusicianRepository } from './musician.repository';
import { MusicionController } from './musicion.controller';

@Module({
    imports:[TypeOrmModule.forFeature([MusicianRepository])],
    exports:[],
    providers:[MusicionService,MusicianRepository],
    controllers: [MusicionController]
})
export class MusicionModule {}
