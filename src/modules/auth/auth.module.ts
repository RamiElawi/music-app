import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { EmailVerificationEntity } from './entities/email-verification.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { User } from './entities/user.entity';
import { ProfileModule } from '../profile/profile.module';
import { EmailVerificationRepository } from './email-verification.reapository';
import { AuthController } from './auth.controller';
import { ForgotPasswordEntity } from './entities/forgotPassword.entity';
import { ForgotPasswordRepository } from './forgotPassword.repository';
import { FavoriteModule } from '../favorite/favorite.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

config()

@Module({
    imports:[
    PassportModule.register({
        defaultStrategy:['jwt','google','facebook']
    })
    ,JwtModule.register({
        secret:process.env.SECRET_KEY,
        signOptions:{
            expiresIn:process.env.EXPIRES_IN
        }
    })
    ,TypeOrmModule.forFeature([
        User,
        EmailVerificationEntity,
        ForgotPasswordEntity
    ])
    ,ProfileModule
    ,FavoriteModule
],
    providers:[
        AuthService,
        JwtStrategy,
        UserRepository,
        EmailVerificationRepository,
        ForgotPasswordRepository,
        GoogleStrategy,
        FacebookStrategy
    ],
    controllers:[AuthController],
    exports:[
        JwtModule,
        JwtStrategy,
        PassportModule,
        AuthService,
        GoogleStrategy,
        FacebookStrategy
    ]
})
export class AuthModule {}
