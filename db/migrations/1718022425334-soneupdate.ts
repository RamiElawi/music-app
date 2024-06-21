import { MigrationInterface, QueryRunner } from "typeorm";

export class Soneupdate1718022425334 implements MigrationInterface {
    name = 'Soneupdate1718022425334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-10T12:27:07.439Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-09 12:12:53.309'`);
    }

}
