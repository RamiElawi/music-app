import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { Transport } from 'src/logger/winston.logger';
import { ValidationPipe } from '@nestjs/common';
import { createDocument } from './swagger/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:WinstonModule.createLogger({
      transports:Transport  
    })
  });
  app.setGlobalPrefix('api')

  SwaggerModule.setup('api',app,createDocument(app))

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
