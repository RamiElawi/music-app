import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('forgotPassword')
export class ForgotPasswordEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    newPasswordToken:string

    @Column()
    timestamp:Date

}