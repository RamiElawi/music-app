import * as path from 'path'
import * as fs from 'fs'
export const clearImage=async (filePath:string)=>{
    const fileP=path.join(__dirname,'..',filePath)
    await fs.unlink(fileP,err=>console.log(err))
}