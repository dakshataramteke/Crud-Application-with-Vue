import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// token Interface
interface CustomRequest extends Request {
    token?: any; 
}

const auth = (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
        // const bearerHeader = req.headers['authorization'];
        const bearerHeader = req.headers.authorization;
        console.log("Bearer Headers",bearerHeader);

        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log("Verifying user",user);
            req.token = user;
            next();
        } else {
            res.status(401).json({success:false, message: 'No Token Provided' });
        }
    } catch (error) {
        res.status(403).json({success:false, message: 'Invalid or expired token' });
    }
};

export default auth;