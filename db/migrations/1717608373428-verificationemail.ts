import { MigrationInterface, QueryRunner } from "typeorm";

export class Verificationemail1717608373428 implements MigrationInterface {
    name = 'Verificationemail1717608373428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailVerification" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "emailToken" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "UQ_c2f642abbadc05cddf80f0e05ae" UNIQUE ("email", "emailToken"), CONSTRAINT "PK_2382546f971f52418d861080fe1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "emailVerification"`);
    }

}
