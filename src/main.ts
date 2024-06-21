import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { Transport } from 'src/logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:WinstonModule.createLogger({
      transports:Transport  
    })
  });
  app.setGlobalPrefix('api')

  const option=new DocumentBuilder()
  .setTitle('Music Application Api')
  .setDescription('all api in music application')
  .setVersion('1.0')
  .build()

  const document=SwaggerModule.createDocument(app,option);
  SwaggerModule.setup('api',app,document)

   const songOption=new DocumentBuilder()
   .setTitle('Music Application, song api')
   .setDescription('the song api')
   .setVersion('1.0')
   .addTag('song')
   .build()

   const songdocument=SwaggerModule.createDocument(app,songOption)
   SwaggerModule.setup('api/song',app,songdocument)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
