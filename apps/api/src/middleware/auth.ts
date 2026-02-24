import { NextFunction  , Request , Response} from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req:Request , res:Response , next:NextFunction) { 
    try{
        const header = req.headers['authorization'];

        if(!header){
            res.send("header is empty")
            return;
        }
        
        console.log(header)
        let data = jwt.verify(header as string , process.env.JWT_SECRET!)

        console.log("auth", data.sub)
        if(data == undefined){
            res.status(404).json("authentication error")
            return;
        }
        req.userId = data.sub as string
        console.log(data.sub as string)

        next()
    }catch(error){
        res.status(209).json({error: "authentication failed"})
    }
}
