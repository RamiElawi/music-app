import { Controller ,Get ,Post ,Put ,Delete ,Param ,Query ,Body ,Patch, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { SingerService } from './singer.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiConsumes, ApiBody} from '@nestjs/swagger';
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
import { FileUploadDto } from './dtos/fileUploadDto.dto';
@Controller('singer')
@ApiTags('Singer')
export class SingerController {
    constructor(private singerService:SingerService){}

    @Post('/addSinger')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:'./files/singer',
            filename:editFile
        })
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateSingerDto})
    async addSinger(@Body() createSingerDto:CreateSingerDto,@UploadedFile() file:any):Promise<InsertResult>{
        return await this.singerService.createSinger(createSingerDto,file.path)
    }

    @Patch('updateSinger/:id')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:'./files/singer',
            filename:editFile
        })
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type:UpdateSingerDto})
    async updateSinger(@Param('id') singerId:number,@Body() updateSingerDto:UpdateSingerDto,@UploadedFile() file:any):Promise<UpdateResult>{
        return await this.singerService.updateSingerById(singerId,updateSingerDto,file.path)
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
