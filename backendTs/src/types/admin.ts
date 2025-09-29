// Admin Types 
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface PaginationQuery {
 query?: string;
  page?: string;
  limit?: string ;
  sortBy?: string;
  order?: string;
}

export interface Admin{
  email:string,
  password: string,
  role: string
}

export interface LoginAdmin{
  email:string,
  password:string
}

// Jwt from jsonwebtoken 
export interface JWTPayload extends JwtPayload{
  email:string,
  password:string
}


// Roles Permission 

export interface AuthRequest extends Request {
  user?:{
  adminid: number;
    email: string;
    role: string;
  },
  permissions?:string[]
  
}

// export interface PermissionRequest extends Request, PaginationQuery{
//   permissions? :string[];
//   roles?: string[];
// } 

export interface PermissionRequest
  extends Request<{}, {}, {}, PaginationQuery> {
  permissions?: string[];
  roles?: string[];
}