import {Entity,PrimaryGeneratedColumn,Column,Unique} from 'typeorm'
@Unique(['name'])
export abstract class BaseAlbum{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string
    @Column()
    image:string;
}