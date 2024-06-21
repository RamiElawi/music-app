import { Controller ,Get ,Post ,Put ,Delete ,Param ,Query ,Body} from '@nestjs/common';
import { CreateAlbumDto } from './dtos/createAlbumDto.dto';
import { AlbumService } from './album.service';
import { UpdateAlbumDto } from './dtos/updateAlbumDtl.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
    constructor(private readonly albumService:AlbumService){}
    
    @Get("/getAllAlbums")
    async getAllAlbums(@Query('limit') limit:number=5,@Query('skip') skip:number=0){
        return await this.albumService.getAlbums(limit,skip)
    }

    @Get(':id')
    async getAlbumById(@Param('id') albumId:number){
        return await this.albumService.getAlbum(albumId)
    }

    @Post("/addAlbum")
    async createAlbum(@Body('createAlbumDto') createAlbumDto:CreateAlbumDto){
        return await this.albumService.addAlbum(createAlbumDto);
    }

    @Put('updateAlbum/:id')
    async updateAlbum(@Param('id') albumId:number,updateAlbum:UpdateAlbumDto){
        return await this.albumService.updateAlbum(updateAlbum,albumId)
    }

    @Delete('deleteAlbum/:id')
    async deleteAlbum(@Param('id') albumId:number){
        return await this.albumService.deleteAlbum(albumId)    
    }
}