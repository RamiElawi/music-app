import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatetrakidtonumber1718023379005 implements MigrationInterface {
    name = 'Updatetrakidtonumber1718023379005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-10T12:43:00.433Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-10 12:27:07.439'`);
    }

}
