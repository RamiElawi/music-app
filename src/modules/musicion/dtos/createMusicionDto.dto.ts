import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { artistType } from "src/common/enums/artist.enum";
import { gender } from "src/common/enums/gender.enum";

export class CreateMusicionDto{
    @IsString({message:'the name should be string'})
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicion name",
        example:"rami"
    })
    name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicion image"
    })
    image:string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicion info",
        example:"he is from syria"
    })
    info:string;
    
    @IsEnum(artistType,{message:`the type should be from this enum ${artistType}`})
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicion type",
        example:artistType.MUSIC_BAND
    })
    type:artistType;
    
    @IsEnum(gender,{message:`the gender should be from this enum ${gender}`})
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicin gender",
        example:gender.MALE
    })
    gender:gender
    
    @IsString({message:'the nationality should be string'})
    @IsNotEmpty()
    @ApiProperty({
        description:"the musicion nationality",
        example:"Syrian"
    })
    nationality:string
   
}