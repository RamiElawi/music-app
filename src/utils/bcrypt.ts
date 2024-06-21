import * as bcrypt from 'bcryptjs'

export function encodePassword(password:string,salt:string){
    // const SALT=bcrypt.genSaltSync()
    return bcrypt.hashSync(password,salt)
}

export function comparePassword(password:string,hashPassword:string){
    return bcrypt.compareSync(password,hashPassword)
}