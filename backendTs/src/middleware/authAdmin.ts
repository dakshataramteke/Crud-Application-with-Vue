import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { decryptToken} from '../utils/crypto';
const JWT_SECRET = process.env.JWT_SECRET ;
import { JwtPayload } from "jsonwebtoken";


interface CustomRequest extends Request {
    token?: string | JwtPayload; 
}

export const authAdmin = (req:CustomRequest, res: Response, next: NextFunction): void => {
    try {
        const encryptToken:string = req.cookies.token;
    //    console.log(" Cookies of Auth Admin is ",token)   
       if(!encryptToken){
        res.status(401).json({
            success:false,
            message: "Unauthorized User"
        })
    }
     const decrypt = decryptToken(encryptToken);
         console.log("Decrypt Code ", decrypt);
     const decode = jwt.verify(decrypt, JWT_SECRET as string);
        if(!decode){
          res.status(401).json({
            success:false,
            message: "Authorization failed"
            })
        }
        req.token = decode;
        next();

    } catch (error) {
        console.log("The Auth error is ", error)
        res.status(403).json({success:false, message: 'Invalid or expired token' });
    }
};
