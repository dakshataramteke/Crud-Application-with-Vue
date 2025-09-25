import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const JWT_SECRET = process.env.JWT_SECRET || 'crud_app';
// token Interface
// interface CustomRequest extends Request {
//     admin?: any; 
// }

interface AnyRequest extends Request{
    token?:any
}

export const authAdmin = (req: AnyRequest, res: Response, next: NextFunction): void => {
    try {
        // const bearerHeader = req.headers['authorization'];
        // const bearerHeader = req.headers.authorization;
        const token = req.cookies.token;
       console.log("Auth Admin token ",token)

       if(!token){
        res.status(401).json({
            success:false,
            message: "Unauthorized User"
        })
    }
     const decode = jwt.verify(token, JWT_SECRET as string);
        if(!decode){
          res.status(401).json({
                message: "Authorization failed"
            })
        }
        next();

    } catch (error) {
        res.status(403).json({success:false, message: 'Invalid or expired token' });
    }
};
