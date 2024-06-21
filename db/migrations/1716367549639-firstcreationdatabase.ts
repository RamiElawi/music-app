import { MigrationInterface, QueryRunner } from "typeorm";

export class Firstcreationdatabase1716367549639 implements MigrationInterface {
    name = 'Firstcreationdatabase1716367549639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."singers_type_enum" AS ENUM('SINGLE', 'MUSIC_BAND')`);
        await queryRunner.query(`CREATE TYPE "public"."singers_gender_enum" AS ENUM('MALE', 'FMALE')`);
        await queryRunner.query(`CREATE TABLE "singers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "info" character varying NOT NULL, "type" "public"."singers_type_enum" NOT NULL, "gender" "public"."singers_gender_enum" NOT NULL, "nationality" character varying NOT NULL, CONSTRAINT "UQ_24ea8384995bf3f8b5cf65079c9" UNIQUE ("name"), CONSTRAINT "PK_0c0d65b66fd2c4fa3a301731106" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "singerId" integer NOT NULL, CONSTRAINT "UQ_5c17fece855899bace782d3a293" UNIQUE ("name"), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."song_type_enum" AS ENUM('PIANO', 'KEYBOARD', 'RECORDER', 'CLASSICAL_GUITAR')`);
        await queryRunner.query(`CREATE TYPE "public"."song_language_enum" AS ENUM('ENGLISH', 'ARABIC', 'FRANCE', 'TURKISH', 'GERMAN')`);
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "artist" character varying NOT NULL, "sourse" character varying NOT NULL, "publishedIn" TIMESTAMP NOT NULL, "image" character varying NOT NULL, "type" "public"."song_type_enum" NOT NULL, "language" "public"."song_language_enum" NOT NULL, "songId" integer NOT NULL, "albumId" integer, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."musicions_type_enum" AS ENUM('SINGLE', 'MUSIC_BAND')`);
        await queryRunner.query(`CREATE TYPE "public"."musicions_gender_enum" AS ENUM('MALE', 'FMALE')`);
        await queryRunner.query(`CREATE TABLE "musicions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "info" character varying NOT NULL, "type" "public"."musicions_type_enum" NOT NULL, "gender" "public"."musicions_gender_enum" NOT NULL, "nationality" character varying NOT NULL, CONSTRAINT "UQ_33073cd61611d03d02334da4ae8" UNIQUE ("name"), CONSTRAINT "PK_55a3b2bbb394e792b1cf353cf17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musicianAlbums" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "musicianId" integer NOT NULL, CONSTRAINT "UQ_f15a43cba6398a686e6e62e6e56" UNIQUE ("name"), CONSTRAINT "PK_81d2e91b6fc67e40bc991cc87b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."musics_type_enum" AS ENUM('PIANO', 'KEYBOARD', 'RECORDER', 'CLASSICAL_GUITAR')`);
        await queryRunner.query(`CREATE TABLE "musics" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "artist" character varying NOT NULL, "sourse" character varying NOT NULL, "publishedIn" TIMESTAMP NOT NULL, "image" character varying NOT NULL, "type" "public"."musics_type_enum" NOT NULL, "musicianAlbumId" integer NOT NULL, CONSTRAINT "PK_a2e622f30df5467a860991af728" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trak" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "index" integer NOT NULL, "playListId" integer NOT NULL, "favoriteId" integer NOT NULL, "songId" integer NOT NULL, "musicId" integer NOT NULL, CONSTRAINT "PK_5f5e89a0456b7944d254b6e4970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "play_list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b8fb404503ce373e885f1e6e3a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "roles" "public"."users_roles_enum" array NOT NULL, "auth" text NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('MALE', 'FMALE')`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "gender" "public"."profiles_gender_enum" NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "favoriteId" integer NOT NULL, CONSTRAINT "UQ_6ca5cd9bacd921599be9d920973" UNIQUE ("phone"), CONSTRAINT "REL_07d7d606ecc3cfb332a345b9d7" UNIQUE ("favoriteId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_a21a56fea2f826c7b2c0e1ef5d6" FOREIGN KEY ("singerId") REFERENCES "singers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_c529927ae410af49faaf2e239a5" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musicianAlbums" ADD CONSTRAINT "FK_371fe156866792bd0b0264168cb" FOREIGN KEY ("musicianId") REFERENCES "musicions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_49b8042ea39dbe8268c72bf9f9e" FOREIGN KEY ("musicianAlbumId") REFERENCES "musicianAlbums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trak" ADD CONSTRAINT "FK_45332b9af48e365d3f38fef2e3c" FOREIGN KEY ("playListId") REFERENCES "play_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trak" ADD CONSTRAINT "FK_c5ddf851365b5649313cc1234a3" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trak" ADD CONSTRAINT "FK_8e93b1d0f544b7c90104ed69065" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trak" ADD CONSTRAINT "FK_d9fbc5885c7b63d1a2d53303e43" FOREIGN KEY ("musicId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "play_list" ADD CONSTRAINT "FK_fd872a93c13bfaecc18111a47e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_07d7d606ecc3cfb332a345b9d7e" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_07d7d606ecc3cfb332a345b9d7e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "play_list" DROP CONSTRAINT "FK_fd872a93c13bfaecc18111a47e6"`);
        await queryRunner.query(`ALTER TABLE "trak" DROP CONSTRAINT "FK_d9fbc5885c7b63d1a2d53303e43"`);
        await queryRunner.query(`ALTER TABLE "trak" DROP CONSTRAINT "FK_8e93b1d0f544b7c90104ed69065"`);
        await queryRunner.query(`ALTER TABLE "trak" DROP CONSTRAINT "FK_c5ddf851365b5649313cc1234a3"`);
        await queryRunner.query(`ALTER TABLE "trak" DROP CONSTRAINT "FK_45332b9af48e365d3f38fef2e3c"`);
        await queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_49b8042ea39dbe8268c72bf9f9e"`);
        await queryRunner.query(`ALTER TABLE "musicianAlbums" DROP CONSTRAINT "FK_371fe156866792bd0b0264168cb"`);
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_c529927ae410af49faaf2e239a5"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_a21a56fea2f826c7b2c0e1ef5d6"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "play_list"`);
        await queryRunner.query(`DROP TABLE "trak"`);
        await queryRunner.query(`DROP TABLE "musics"`);
        await queryRunner.query(`DROP TYPE "public"."musics_type_enum"`);
        await queryRunner.query(`DROP TABLE "musicianAlbums"`);
        await queryRunner.query(`DROP TABLE "musicions"`);
        await queryRunner.query(`DROP TYPE "public"."musicions_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."musicions_type_enum"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`DROP TYPE "public"."song_language_enum"`);
        await queryRunner.query(`DROP TYPE "public"."song_type_enum"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "singers"`);
        await queryRunner.query(`DROP TYPE "public"."singers_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."singers_type_enum"`);
    }

}
