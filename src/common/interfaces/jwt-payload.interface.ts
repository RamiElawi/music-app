import { role } from "../enums/role.enum";

export interface JwtPayLoad{
    email:string,
    role:role[],
    userId:number
}