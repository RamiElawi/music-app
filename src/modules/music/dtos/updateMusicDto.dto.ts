import { PartialType } from "@nestjs/swagger";
import { CreateMusicDto } from "./createMusicDto.dto";

export class UpdateMusicDto extends PartialType(CreateMusicDto){
    
}