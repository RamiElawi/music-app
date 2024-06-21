import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcreatedAttoprofile1717935171571 implements MigrationInterface {
    name = 'AddcreatedAttoprofile1717935171571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-06-09T12:12:53.309Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" DROP COLUMN "createdAt"`);
    }

}
