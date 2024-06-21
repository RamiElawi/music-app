import { PartialType } from "@nestjs/swagger";
import { PlaylistDto } from "./playlistDto.dto";

export class updatePlayListDto extends PartialType(PlaylistDto){}