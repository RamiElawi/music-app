import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { musicType } from "src/common/enums/musicType.enum";
import { songLanguage } from "src/common/enums/songLanguage.enum";

export class CreateSongDto{
    @IsString({message:"name should be string"})
    @IsNotEmpty({message:'name should not be empty'})
    @ApiProperty()
    name:string
    @IsString({message:'description should be string'})
    @IsNotEmpty({message:'description should not be empty'})
    @ApiProperty({
        description:"the song's description",
        example:'this song is very goog'
    })
    description:string;
    @ApiProperty({
        description:"the singer's name"
    })
    @IsString({message:'artist should be string'})
    @IsNotEmpty({message:'artist should not be empty'})
    artist:string;
    @IsString({message:'source should be string'})
    @IsNotEmpty({message:'source should not be empty'})
    @ApiProperty({
        description:"the song"
    })
    sourse:string
    @IsDate()
    @ApiProperty({
        description:"the time when the song is published"
    })
    publishedIn:Date
    @IsString({message:'image should be string'})
    @IsNotEmpty({message:'image should not be empty'})
    @ApiProperty({
        description:"the songs image"
    })
    image:string
    @IsEnum({message:`type should be from this enum ${musicType}`})
    @IsNotEmpty({message:'type should not be empty'})
    @ApiProperty({
        description:'the type of song',
        example:musicType.PIANO
    })
    type:musicType
    @IsEnum({message:` song language should be from this enum ${songLanguage}`})
    @IsNotEmpty({message:'song language should not be empty'})
    @ApiProperty({
        description:"the song's language",
        example:songLanguage.ENGLISH
    })
    songLanguage:songLanguage
    @IsNumber()
    @IsNotEmpty({message:'album id should not be empty'})
    @ApiProperty({
        description:"the album number",
        example:1
    })
    albumId:number

}