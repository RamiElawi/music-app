import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto{
    @ApiProperty({
        description:"the album name",
        example:"the big mom"
    })
    @IsString({message:"name should be string"})
    @IsNotEmpty({message:'name should not be empty'})
    name:string
    @ApiProperty({
        description:"the album image"
    })
    @IsString({message:'image should be string'})
    @IsNotEmpty({message:'image should not be empty'})
    image:string;
    @ApiProperty({
        description:'the singer Id',
        example:1
    })
    @IsNumber({},{message:"singer id should be number"})
    @IsNotEmpty({message:'singer id should not be empty'})
    singerId:number
}