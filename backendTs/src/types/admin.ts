// Admin Types 
import { Request } from 'express';

export interface Admin{
  email:string,
  password: string,
  role: string
}

export interface LoginAdmin{
  email:string,
  password:string
}
export interface JwtPayload{
  email:string,
  password:string
}


// Roles Permission 

export interface AuthRequest extends Request {
  user?:{
  adminid: number;
    email: string;
    role: string;
  }
  
}

