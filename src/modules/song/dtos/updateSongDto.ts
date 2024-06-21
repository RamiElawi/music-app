import { PartialType } from "@nestjs/swagger";
import { CreateSongDto } from "./createSongDto.dto";

export class UpdateSongDto extends PartialType(CreateSongDto){
    
}