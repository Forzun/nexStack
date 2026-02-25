import { NextFunction  , Request , Response} from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req:Request , res:Response , next:NextFunction) { 
    const authHeader = req.headers.authorization; 

    if(!authHeader){
        res.status(401).json({error: "token is undefined"});
        return; 
    }

    const token = authHeader.startsWith("Bearer") ? authHeader.slice(7) : authHeader;

    console.log("here is token", token)
    try{
        const response = jwt.verify(token , process.env.JWT_SECRET!) as { 
            sb: string
        };

        if(!response){
            res.status(401).json({error: "token is undefined", token: response})
            return;
        }

        req.userId = response.sb;
        next();
    }catch(error){
        res.status(209).json({error: "authentication failed"})
    }
}
