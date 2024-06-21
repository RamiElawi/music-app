import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatesongtable1716390690351 implements MigrationInterface {
    name = 'Updatesongtable1716390690351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "songId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD "songId" integer NOT NULL`);
    }

}
