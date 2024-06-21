import { MigrationInterface, QueryRunner } from "typeorm";

export class Forgotpassword1717842767727 implements MigrationInterface {
    name = 'Forgotpassword1717842767727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forgotPassword" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "newPasswordToken" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_69662692e88f30f4c6e38c5a59f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "forgotPassword"`);
    }

}
