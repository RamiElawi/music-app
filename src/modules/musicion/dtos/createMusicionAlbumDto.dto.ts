import { IsNotEmpty, IsString } from "class-validator";

export class CreateMusicionAlbumDto{
    @IsString({message:'the name should be string'})
    @IsNotEmpty()
    name:string
}