
import { PartialType } from "@nestjs/swagger";
import { CreateMusicionDto } from "./createMusicionDto.dto";

export class UpdateMusicionDto extends PartialType(CreateMusicionDto){

}