import { ApiProperty } from "@nestjs/swagger";
import { musicType } from "src/common/enums/musicType.enum";

export class CreateMusicDto{
    @ApiProperty({
        description:"the music's name ",
        example:'i love you boy'
    })
    name:string
    @ApiProperty({
        description:"the music's description",
        example:'this music is very goog'
    })
    description:string;
    @ApiProperty({
        description:"the singer's name"
    })
    artist:string;
    @ApiProperty({
        description:"the music"
    })
    sourse:string
    @ApiProperty({
        description:"the time when the music is published"
    })
    publishedIn:Date
    @ApiProperty({
        description:"the musics image"
    })
    image:string
    @ApiProperty({
        description:'the type of music',
        example:musicType.PIANO
    })
    type:musicType
    @ApiProperty({
        description:"the musicianAlbum number",
        example:1
    })
    musicianAlbumId:number

}