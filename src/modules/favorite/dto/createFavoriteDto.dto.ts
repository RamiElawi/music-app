import { CreateProfileDto } from "src/modules/profile/dto/createProfileDto.dto";

export class CreateFavoriteDto{
    Profile:CreateProfileDto
    tracks:[]
}