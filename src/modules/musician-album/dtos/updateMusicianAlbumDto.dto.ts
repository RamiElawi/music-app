import { PartialType } from "@nestjs/swagger";
import { CreateMusicianAlbumDto } from "./createMusicianAlbumDto.dto";

export class UpdateMusicianAlbumDto extends PartialType(CreateMusicianAlbumDto){}