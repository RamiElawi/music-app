import { musicType } from 'src/common/enums/musicType.enum';
import {PrimaryGeneratedColumn,Column} from 'typeorm'


export abstract class BaseMusic{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    description:string;
    @Column()
    artist:string;
    @Column()
    sourse:string
    @Column()
    publishedIn:Date
    @Column()
    image:string
    @Column({
        type:'enum',
        enum:musicType
    })
    type:musicType

}