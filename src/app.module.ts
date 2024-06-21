import { Module,Logger, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import {  SingerModule } from './modules/singer/singer.module';
import { MusicionModule } from './modules/musicion/musicion.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SongModule } from './modules/song/song.module';
import { MusicModule } from './modules/music/music.module';
import { AlbumModule } from './modules/album/album.module';
import { MusicianAlbumModule } from './modules/musician-album/musician-album.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TrakModule } from './modules/trak/trak.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { RequestLoggerMiddleware } from './middlewares/request-logging.middleware';
import { dataSourceOption } from 'db/dataSource';
import { MulterModule } from '@nestjs/platform-express';
import {NodemailerDrivers, NodemailerModule, NodemailerOptions} from '@crowdlinker/nestjs-mailer'
import { config } from './config';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { ChatModule } from './shared/modules/chat/chat.module';
import { MessageModule } from './shared/modules/message/message.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    MulterModule.register({dest:'./files'}),
    NodemailerModule.forRoot(config.NodeMailerOptions as NodemailerOptions<NodemailerDrivers.SMTP>),
    AuthModule,
    ProfileModule,
    SingerModule,
    MusicionModule,
    FavoriteModule,
    PlaylistModule,
    SongModule,
    MusicModule,
    AlbumModule,
    MusicianAlbumModule,
    NotificationModule,
    TrakModule,
    ChatModule,
    MessageModule
  ],
  controllers: [],
  providers:[]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    consumer.apply(CurrentUserMiddleware)
    .exclude(
      'auth/register',
      'auth/login',
      'auth/login/google',
      'auth/google/callback'
    )
    .forRoutes({path:'*',method:RequestMethod.ALL})
  }
}
