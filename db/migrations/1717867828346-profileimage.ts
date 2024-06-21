import { MigrationInterface, QueryRunner } from "typeorm";

export class Profileimage1717867828346 implements MigrationInterface {
    name = 'Profileimage1717867828346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "image"`);
    }

}
