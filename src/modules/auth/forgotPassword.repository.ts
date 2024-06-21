import { EntityRepository ,Repository} from "typeorm";
import { ForgotPasswordEntity } from "./entities/forgotPassword.entity";
import dataSource from "db/dataSource";

@EntityRepository(ForgotPasswordEntity)
export class ForgotPasswordRepository extends Repository<ForgotPasswordEntity>{

    async findForgettenPassword(email:string):Promise<ForgotPasswordEntity>{
        return await dataSource
        .getRepository(ForgotPasswordEntity)
        .createQueryBuilder('forgotPassword')
        .where('forgotPassword.email = :email',{email})
        .getOne()
    }

    async findByToken(token:string){
        return await dataSource
        .getRepository(ForgotPasswordEntity)
        .createQueryBuilder('forgotPassword')
        .where('forgotPassword.newPasswordToken =:token',{token})
        .getOne()
    }
}