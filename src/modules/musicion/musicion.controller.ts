import { Controller,Get,Post,Put,Patch,Delete, Param, Body ,Query} from '@nestjs/common';
import { CreateMusicionDto } from './dtos/createMusicionDto.dto';
import { UpdateMusicionDto } from './dtos/updateMusicionDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { MusicionService } from './musicion.service';
import { artistType } from 'src/common/enums/artist.enum';
import { gender } from 'src/common/enums/gender.enum';

@Controller('musicion')
@ApiTags('musicion')
export class MusicionController {
    constructor(private readonly musicionService:MusicionService){}

    @Get('/allMusicions')
    async getAllMusicion(@Query('limit') limit:number=5,@Query('skip') skip:number=0){
        return await this.musicionService.getMusicions(limit,skip)
    }

    @Get('/Musicionsfilter')
    async getFilterMusicion(@Query('limit') limit:number,@Query('nationality') nationality:string,
    @Query('type') type:artistType,@Query('gender') gender:gender){
        return await this.musicionService.getFilterMusicion(limit,nationality,type,gender)
    }

    @Get('/:id')
    async getMusicionById(@Param('id') musicionId:number){
        return await this.musicionService.getMusicionById(musicionId)
    }

    @Post("/addMusicion")
    async createNewMusicion(@Body() createMusicionDto:CreateMusicionDto){
        return await this.musicionService.addMusicion(createMusicionDto)
    }

    @Put('/updateMusicion/:id')
    async updateMusicion(@Param('id') musicionId:number,@Body() updateMusicion:UpdateMusicionDto){
        return await this.musicionService.updateMusicion(musicionId,updateMusicion)
    }

    @Delete('/deleteMusicion/:id')
    async deleteMusicion(@Param('id') musicionId:number){
        return await this.musicionService.deleteMusicion(musicionId)
    }
}
