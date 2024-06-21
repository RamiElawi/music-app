import { MigrationInterface, QueryRunner } from "typeorm";

export class Notificationimplementation1718787048109 implements MigrationInterface {
    name = 'Notificationimplementation1718787048109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriberNotification" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "data" text NOT NULL, "actions" jsonb NOT NULL, "vibrate" integer array NOT NULL, "notificationId" integer, "subscirberId" integer, CONSTRAINT "PK_86804ab0b9ba0729837e15e942d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriber" ("id" SERIAL NOT NULL, "endPoint" character varying NOT NULL, "expirationTime" TIMESTAMP, "keys" text NOT NULL, CONSTRAINT "PK_1c52b7ddbaf79cd2650045b79c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "subscriberId" integer`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ALTER COLUMN "joinIn" SET DEFAULT '"2024-06-19T08:50:50.418Z"'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-19T08:50:50.418Z"'`);
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '"2024-06-19T08:50:50.429Z"'`);
        await queryRunner.query(`ALTER TABLE "subscriberNotification" ADD CONSTRAINT "FK_32b61f7c3367fbfd04d9edc79f9" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriberNotification" ADD CONSTRAINT "FK_b9cad652a8b36b7ad801f876ac2" FOREIGN KEY ("subscirberId") REFERENCES "subscriber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriberNotification" DROP CONSTRAINT "FK_b9cad652a8b36b7ad801f876ac2"`);
        await queryRunner.query(`ALTER TABLE "subscriberNotification" DROP CONSTRAINT "FK_32b61f7c3367fbfd04d9edc79f9"`);
        await queryRunner.query(`ALTER TABLE "play_list" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-11 15:37:52.617'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-11 15:37:52.615'`);
        await queryRunner.query(`ALTER TABLE "userJoinRoom" ALTER COLUMN "joinIn" SET DEFAULT '2024-06-11 15:37:52.615'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscriberId"`);
        await queryRunner.query(`DROP TABLE "subscriber"`);
        await queryRunner.query(`DROP TABLE "subscriberNotification"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
