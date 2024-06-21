import { ApiProperty } from '@nestjs/swagger';
import { artistType } from 'src/common/enums/artist.enum';
import { gender } from 'src/common/enums/gender.enum';
import {BaseEntity, Column,PrimaryGeneratedColumn,Unique} from 'typeorm'
@Unique(['name'])
export abstract class BaseArtist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:string;
    
    @Column()
    name:string;
    
    @Column()
    image:string
    
    @Column()
    info:string;
    
    @Column({
        type:'enum',
        enum:artistType
    })
    type:artistType;
    
    @Column({
        type:'enum',
        enum:gender
    })
    gender:gender
    @Column()
    nationality:string

}