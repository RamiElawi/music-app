import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { artistType } from 'src/common/enums/artist.enum';
import { gender } from 'src/common/enums/gender.enum';
// 
export class CreateSingerDto{
    @ApiProperty({
        description:"the singer name",
        example:"rami"
    })
    @IsString({message:"this name should be string"})
    name:string;
    @ApiProperty({
        description:"here enter an info for the singer ",
        example:"he is a new singer in singerWorld"
    })
    @IsString({message:"the info should be string"})
    info:string;
    @ApiProperty({
        description:"the singer type",
        example:artistType.MUSIC_BAND,
        enum:artistType
    })
    @IsEnum(artistType,{message:"the type should be from this enum"})
    type:artistType;
    @ApiProperty({
        description:"the singer gender",
        example:gender.MALE
    })
    @IsEnum(gender,{message:"the gender should be from this enum"})
    gender:gender;
    @ApiProperty({
        description:"the singer nationality",
        example:"syria"
    })
    @IsString({message:'the nationality should be string'})
    nationality:string   
}