import { Controller ,Get ,Post ,Put ,Delete ,Param ,Query ,Body ,Patch, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { SingerService } from './singer.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiConsumes} from '@nestjs/swagger';
import { CreateSingerDto } from './dtos/createSingerDto.dto';
import { Singer } from './entities/singer.entity';
import { artistType } from 'src/common/enums/artist.enum';
import { gender } from 'src/common/enums/gender.enum';
import { UpdateSingerDto } from './dtos/updateSingerDto.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFile } from 'src/helpers/handlingFile.helper';
import {diskStorage} from 'multer'
import { AuthorizeRoles } from 'src/common/decorators/authorize-role.decorator';
import { role } from 'src/common/enums/role.enum';
import { AuthorizeGuard } from 'src/common/Guards/user-auth.guard';
@Controller('singer')
@ApiTags('Singer')
export class SingerController {
    constructor(private singerService:SingerService){}

    @Post('/addSinger')
    @ApiCreatedResponse({
        description:"done",
    })
    @ApiBadRequestResponse({description:' can not add singer'})
    // @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:'./files/singer',
            filename:editFile
        })
    }))
    async addSinger(@Body() createSingerDto:CreateSingerDto,@UploadedFile() image:any):Promise<InsertResult>{
        return await this.singerService.createSinger(createSingerDto,image.path)
    }


    
    @Patch('updateSinger/:id')
    async updateSinger(@Param('id') singerId:number,@Body() updateSingerDto:UpdateSingerDto):Promise<UpdateResult>{
        return await this.singerService.updateSingerById(singerId,updateSingerDto)
    }

    @Delete('deleteSinger/:id')
    async deleteSinger(@Param('id') singerId:number):Promise<DeleteResult>{
        return await this.singerService.deleteSingerById(singerId)
    }

    @UseGuards(AuthorizeGuard)
    @AuthorizeRoles(role.ADMIN,role.USER)
    @Get('/allSinger')
    async getAllSinger(@Query('limit')limit:number=5,@Query('skip') skip:number=0):Promise<Singer[]>{
        return await this.singerService.getSingers(limit,skip);
    }

    
    @Get('/:id')
    async getSingerById(@Param('id') singerId:number):Promise<Singer>{
        return await this.singerService.getSingerId(singerId)
    }
    
    @Get('/singer/filterSinger')
    async getFilterSinger(@Query('limit') limit?:number,@Query('nationality') nationality?:string,
    @Query('type') type?:artistType,@Query('gender') gender?:gender
    ){
        return await this.singerService.getFilterSinger(limit,nationality,type,gender)
    }
    
    
    
    
}
