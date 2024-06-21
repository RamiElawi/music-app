import { EntityRepository, Repository } from "typeorm";
import { EmailVerificationEntity } from "./entities/email-verification.entity";
import dataSource from "db/dataSource";

@EntityRepository(EmailVerificationEntity)
export class EmailVerificationRepository extends Repository<EmailVerificationEntity>{
    async findEmail(email:string):Promise<EmailVerificationEntity>{
        return await dataSource
        .getRepository(EmailVerificationEntity)
        .createQueryBuilder('emailVerification')
        .where('emailVerification.email = :email',{email})
        .getOne()
    }
    async findEmailByToken(token:string):Promise<EmailVerificationEntity>{
        return await dataSource
        .getRepository(EmailVerificationEntity)
        .createQueryBuilder('emailVerification')
        .where('emailVerification.emailToken = :token',{token})
        .getOne()
    }

}