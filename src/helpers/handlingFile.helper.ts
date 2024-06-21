import { extname } from "path"

export const fileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3)/))
        return cb(new Error('only image file are allowed or mp3'))
    cb(null,true)
}

export const editFile= (req,file,cb)=>{
    const name=file.originalname.split('.')[0]
    const fileExtName= extname(file.originalname);
    const randomName=Array(4)
    .fill(null)
    .map(()=>Math.round(Math.random()*16).toString(16))
    .join('')
    cb(null,`${randomName}${name}-${fileExtName}`)
}