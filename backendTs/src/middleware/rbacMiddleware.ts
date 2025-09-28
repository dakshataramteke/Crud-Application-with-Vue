import { Request, Response, NextFunction, RequestHandler } from 'express';
import roles from '../config/roles.json';
import { AuthRequest } from '../types/admin';

// Authorize Permission 
const authorisePermission = (permission:string) => {
  return (req:AuthRequest, res:Response, next:NextFunction) => {
    const userRole = req.user?.role;
    console.log("User Role is ", userRole);
  
    if(!userRole){
        return res.status(401).json({
            success:false,
            message:"Unauthorized : No Role Found"
        })
    }

    const roleConfig  = roles.roles.find((r)=> r.name === userRole);
    if(!roleConfig){
        return res.status(403).json({
            success:false,
            message:"Access Denied Insufficient Permission"
        })
  };
  if(!roleConfig.permissions.includes(permission)){
    return res.status(403).json({
        success:false,
        message:"Access Denied Insufficient Permission"
    })
  }
  next();
};
}

export default authorisePermission;