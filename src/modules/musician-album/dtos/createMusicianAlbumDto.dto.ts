import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMusicianAlbumDto{
    @ApiProperty({
        description:"the musicion album name",
        example:"dndndnd"
    })
    @IsNotEmpty({message:'the name should not be empty'})
    @IsString({message:"the name should be string"})
    name:string
    @ApiProperty({
        description:"the musicion album name",
        example:"the big pan"
    })
    @IsNotEmpty({message:'the image should not be empty'})
    @IsString({message:"the image should be string"})
    image:string;
    @ApiProperty({
        description:"the musician Id",
        example:1
    })
    @IsNotEmpty({message:'the musicionId should not be empty'})
    @IsNumber({},{message:"the musicion id should be number"})
    musicianId:number
}