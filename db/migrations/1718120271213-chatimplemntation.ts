import { MigrationInterface, QueryRunner } from "typeorm";

export class Chatimplemntation1718120271213 implements MigrationInterface {
    name = 'Chatimplemntation1718120271213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userJoinRoom" ("id" SERIAL NOT NULL, "joinIn" TIMESTAMP NOT NULL DEFAULT '"2024-06-11T15:37:52.615Z"', "userId" integer NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "PK_f09f0c00f2b3dc7557a3b6700d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-06-11T15:37:52.615Z"', "createdBy" character varying NOT NULL, "image" character varying, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-11T15:37:52.617Z"'`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ADD CONSTRAINT "FK_e218e52e300651355a99a9969f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ADD CONSTRAINT "FK_b9eeb9b4f4bde11cf466a33e696" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" DROP CONSTRAINT "FK_b9eeb9b4f4bde11cf466a33e696"`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" DROP CONSTRAINT "FK_e218e52e300651355a99a9969f0"`);
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-10 12:43:00.433'`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "userJoinRoom"`);
    }

}
