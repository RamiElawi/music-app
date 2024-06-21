import {BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common'
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUserDto.dto';
import { CreateProfileDto } from '../profile/dto/createProfileDto.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { LoginDto } from './dtos/loginDto.dto';
import { role } from "src/common/enums/role.enum";
import { ProfileService } from '../profile/profile.service';
import { Auth } from 'src/common/class/auth';
import { EmailVerificationRepository } from './email-verification.reapository';
import { EmailVerificationEntity } from './entities/email-verification.entity';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { config } from '../../config';
import { JwtPayLoad } from 'src/common/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordRepository } from './forgotPassword.repository';
import { ForgotPasswordEntity } from './entities/forgotPassword.entity';
import { ResetPasswordDto } from './dtos/resetPasswordDto.dto';
import { FavoriteService } from '../favorite/Favorite.service';
import { Profile } from '../profile/entities/profile.entity';
import { Favorite } from '../favorite/entities/favorite.entity';



@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(UserRepository)private readonly userRepository:UserRepository,
        @InjectRepository(EmailVerificationRepository) private readonly emailVerification:EmailVerificationRepository,
        @InjectRepository(ForgotPasswordRepository) private readonly forgotPasswordRep:ForgotPasswordRepository,
        private readonly profileService:ProfileService,
        private readonly favoriteService:FavoriteService,
        private nodeMailer:Nodemailer<NodemailerDrivers.SMTP>,
        private jwtService:JwtService
    ){}
   
    async findUserbyEmail(email:string):Promise<User>{
        const user=await this.findByEamil(email)
        if(user) throw new BadRequestException('this email is already exsist')
        return user;
    }

    async findByEamil(email:string):Promise<User>{
        return await this.userRepository.findbyEmail(email)
    }

    async findUserByUserName(userName:string){
        const user=await this.userRepository.findByUserName(userName);
        if(user)throw new BadRequestException('this username is already exist')
        return user
    }

    async singUp(createUserDto:CreateUserDto,createProfileDto:CreateProfileDto):Promise<void>{
        const user=new User()
        user.salt=bcrypt.genSaltSync()
        await this.findUserbyEmail(createUserDto.email)
        await this.findUserByUserName(createUserDto.username)
        user.username=createUserDto.username;
        user.email=createUserDto.email;
        const hashPassword=await encodePassword(createUserDto.password,user.salt)
        user.password=hashPassword;
        user.profile=await this.profileService.createProfile(user,createProfileDto)
        user.roles=[role.USER]
        user.playLists=[];
        user.auth=new Auth()
        user.auth.emailId=null;
        user.auth.facebookId=null;
        user.auth.validEmail=false;

        // sendEmail
        await this.createEmailToken(createUserDto.email)
        await this.sendEmailVerification(createUserDto.email)


        await user.save()
    }


    async createEmailToken(email:string):Promise<Boolean>{
        const verfiedEmail=await this.emailVerification.findEmail(email)
        console.log(verfiedEmail)
        if(verfiedEmail && ((new Date().getTime() - verfiedEmail.timestamp.getTime())/60000) < 15 ){
            throw new HttpException('LOGIN_EMAIL_SENT_RECENTLY',HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const newEmailVerification=new EmailVerificationEntity()
        newEmailVerification.email=email;
        newEmailVerification.emailToken=(Math.floor(Math.random()*900000)+100000).toString()
        newEmailVerification.timestamp=new Date()
        newEmailVerification.save()
        return true
    }
    

    async sendEmailVerification(email:string){
        const emailVerified=await this.emailVerification.findEmail(email)
        console.log(emailVerified)
        console.log(email)

        // if(emailVerified && emailVerified.emailToken){
            const url=`<a style="text-decoration:none" 
            href:http//${config.fontEndKeys.url}:${config.fontEndKeys.port}/${config.fontEndKeys.endPoints[1]}
            ></a>`
            return await this.nodeMailer.sendMail({
                from:`Company <elawirse@gmail.com>`,
                to:email,
                subject:'Verify Email',
                text:"verify email",
                html:` hi <br><br> this email is from our company to register in our website thanks for that 
                ${url}`
            }).then(info=>{
                console.log(info)
            }).catch(err=>{
                console.log(err)
            })
        // }
        // throw new HttpException('REGISTER_USER_NOT_REGISTERED',HttpStatus.FORBIDDEN )
    }

    async verifyEmail(token:string):Promise<{isFullverified:boolean,user:User}>{
        const verfiedEmail=await this.emailVerification.findEmailByToken(token)
        if(verfiedEmail && verfiedEmail.email){
            const user=await this.userRepository.findbyEmail(verfiedEmail.email)
            if(user){
                user.auth.validEmail=true;
                const updatedUser=await user.save()
                await verfiedEmail.remove()
                return {isFullverified:true,user:updatedUser}
            }
        }
        throw new HttpException('Login Email Code not valied',HttpStatus.FORBIDDEN )
    }   

    // async ValidateUserPassword(logInDto:LoginDto):Promise<Boolean>{
    //      const hashPassword=await encodePassword(logInDto.password,user.salt)
    //     if(!comparePassword(logInDto.password,hashPassword)) throw new BadRequestException('your password is not correct');
    //     return user;
    // }

    async isAdmin(user:User){
        return await user.roles.some(r=>r===role.ADMIN)
    }

    async ValidateAdminPassword(adminLoginDto:LoginDto){
        const {email,password}=adminLoginDto;
        const user=await this.findUserbyEmail(email)
        if(!user){throw new NotFoundException()}
        if(!this.isAdmin(user)) {throw new ForbiddenException('you don\'t have authorization to access this route')}
        const hashPassword=await encodePassword(password,user.salt)
        if(!comparePassword(password,hashPassword)){throw new BadRequestException('your password is not correct');}
        return user;
    }


    async singIn(loginDto:LoginDto):Promise<{accessToken:string,user:User}>{
        const user=await this.userRepository.findbyEmail(loginDto.email)
        if(!user) throw new NotFoundException("user did not found")
            console.log(user.email)
         const hashPassword=await encodePassword(loginDto.password,user.salt)
        if(!comparePassword(loginDto.password,hashPassword)) throw new BadRequestException('your password is not correct');
        const email=user.email
        const role=user.roles
        const userId=user.id
        // const payload:JwtPayLoad={email,role,userId}
        const accessToken=await this.generatedJWTToken(email,userId,role)
        return {accessToken,user}
    }

    async sendEmailForgottenPassword(email:string):Promise<any>{
        const user=await this.findByEamil(email)
        if(!user) throw new NotFoundException("this user is not found")
        const passToken=await this.generateForgottenPasswordToken(email);
        const url=`<a style="text-decoration:none" 
        href:http//${config.fontEndKeys.url}:${config.fontEndKeys.port}/${config.fontEndKeys.endPoints[1]}
        ></a>`
        return await this.nodeMailer.sendMail({
            from:'Company<elawirse@gmail.com>',
            to:email,
            subject:"reset password",
            text:'reset password',
            html:` hi <br><br> this email is from our company to reset your password ${url}`,
        })
        .then(info=>{
            console.log(info)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async generateForgottenPasswordToken(email:string){
        const forgettenPassword=await this.forgotPasswordRep.findForgettenPassword(email)
        if(forgettenPassword && ((new Date().getTime() - forgettenPassword.timestamp.getTime())/60000)<15){
            throw new HttpException('RESET_PASSWORD_EMAIL_SEND_RECENTLY',HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const forgotPassword= new ForgotPasswordEntity()
        forgotPassword.email=email
        forgotPassword.timestamp=new Date()
        forgotPassword.newPasswordToken=(Math.floor(Math.random()*90000)+100000).toString()
        return await forgotPassword.save()
    
    }



    async checkPassword(email:string,password:string):Promise<Boolean>{
        const user=await this.findByEamil(email);
        if(!user) throw new NotFoundException('this user is not found')

        return await comparePassword(password,user.password);
    }

    async setNewPassword(resetPassword:ResetPasswordDto){
        const isValiedPassword=await this.checkPassword(resetPassword.email,resetPassword.newPassword)
    
        if(!isValiedPassword) throw new BadRequestException('you are already set this password please find another one')
        if(resetPassword.newPasswordToken){
            const forgetpassword=await this.forgotPasswordRep.findByToken(resetPassword.newPasswordToken)
            const salt=await bcrypt.genSaltSync()
            const user=await this.findByEamil(forgetpassword.email)
            user.salt=salt;
            const hashPassword=await encodePassword(resetPassword.newPassword,salt)
            user.password=hashPassword;
            await user.save();
            await forgetpassword.remove()
            return true;
        }

    }

    async getUserData(user:User):Promise<{user:User,profile:Profile,favorite:Favorite}>{
        const profile=await this.profileService.getProfile(user.profileId)
        const favorite=await this.favoriteService.getFavoriteList(profile.favoriteId)
        return {user,profile,favorite}
    }

    async generatedJWTToken(email:string,userId:number,role:role[]){
        const payload:JwtPayLoad={email,userId,role}
        const jwt=await this.jwtService.sign(payload)
        return jwt
    }   

    async findByGoogleId(googleId:string){
        return await this.userRepository.findByGoogleId(googleId)
    }

    async findByFacebookId(facebookId:string){
        return await this.userRepository.findByFacebookId(facebookId)
    }

    async singInGoogle(profile:any,googleId:string):Promise<{googleuser:User,jwt:string}>{
        let user=new User()
        user.googleId=googleId
        user=await this.setUserInfo(user,profile)
        const googleuser=await user.save()
        const jwt=await this.generatedJWTToken(profile.emails[0].value,user.id,user.roles)
        return {googleuser,jwt}
    }

    async singInFacebook(profile:any,facebookId:string):Promise<{facebookUser:User,jwt:string}>{
        let user=new User()
        user.facebookId=facebookId
        user=await this.setUserInfo(user,profile)
        const facebookUser=await user.save()
        const jwt=await this.generatedJWTToken(profile.emails[0].value,user.id,user.roles)
        return {facebookUser,jwt}
    }

    async setUserInfo(user:User,profile:any){
        const {emails,displayName,name,photos}=profile
        const isEmailExist=await this.findUserbyEmail(emails[0].vlaue)
        const isUserNameExist=await this.findUserByUserName(displayName)
        if(isEmailExist) throw new BadRequestException('this email is already exist try antoher one')
        if(isUserNameExist) throw new BadRequestException('this email is already exist try antoher one')
        user.username=displayName;
        user.email=emails[0].value;
        user.roles=[role.USER]
        user.auth=new Auth()
        user.auth.emailId=null;
        user.auth.facebookId=null;
        user.auth.validEmail=false;
        const newProfile=new Profile()
        newProfile.user=user;
        newProfile.firstName=name.givenName
        newProfile.lastName=name.familyName
        newProfile.image=photos[0].value
        newProfile.favorite=await this.favoriteService.createFavorite(newProfile)
        user.isEmailVerified=true
        user.profile=await newProfile.save()
        return user
    }
}

