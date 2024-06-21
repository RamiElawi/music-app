import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('emailVerification')
@Unique(['email','emailToken'])
export class EmailVerificationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    emailToken:string

    @Column()
    timestamp:Date
}