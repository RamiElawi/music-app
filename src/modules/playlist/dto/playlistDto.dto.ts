import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class PlaylistDto{
    @IsString()
    @IsNotEmpty()
    name:string
}