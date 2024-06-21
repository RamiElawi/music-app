import { MigrationInterface, QueryRunner } from "typeorm";

export class Googlestrategyimplementation1718820099307 implements MigrationInterface {
    name = 'Googlestrategyimplementation1718820099307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "facebookId" character varying`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "age" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ALTER COLUMN "joinIn" SET DEFAULT '"2024-06-19T18:01:41.525Z"'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-19T18:01:41.525Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "salt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-19T18:01:41.534Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-19 08:50:50.429'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "salt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-19 08:50:50.418'`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ALTER COLUMN "joinIn" SET DEFAULT '2024-06-19 08:50:50.418'`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "age" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "facebookId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailVerified"`);
    }

}
