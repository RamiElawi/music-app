import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FavoriteService } from './Favorite.service';

@Controller('favorite')
export class FavoriteController {
    constructor(private readonly favoriteService:FavoriteService){}
    
    @Get(':id')
    async getFavoriteList(@Param('id') id:number){
        return await this.favoriteService.getFavoriteList(id)
    }

    @Delete(':id/clearFavoriteList')
    async clearFavoriteList(@Param('id') id:number){
        return await this.favoriteService.clearFavoriteTrakContent(id)
    }

    @Delete(':favoriteId/clearTrackFromFavorite/:trackId')
    async removeTrackFromFavorite(@Param('favoriteId') favoriteId:number,@Param('trackId') trackId:number){
        return await this.favoriteService.removeTrakfromFavorite(favoriteId,trackId)
    }

}   