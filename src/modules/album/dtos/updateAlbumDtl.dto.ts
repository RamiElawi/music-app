import { PartialType } from "@nestjs/swagger";
import { CreateAlbumDto } from "./createAlbumDto.dto";

export class UpdateAlbumDto extends PartialType(CreateAlbumDto){
    
}