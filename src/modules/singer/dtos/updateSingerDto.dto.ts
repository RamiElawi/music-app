import { PartialType } from "@nestjs/swagger";
import { CreateSingerDto } from "./createSingerDto.dto";

export class UpdateSingerDto extends PartialType(CreateSingerDto){}