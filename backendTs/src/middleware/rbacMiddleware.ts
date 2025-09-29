import { Response, NextFunction } from 'express';
import roles from '../config/roles.json';
import { AuthRequest } from '../types/admin';

const authorisePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    console.log("UserRole Permission", userRole)

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Role Found"
      });
    }

    
    const roleObj = roles.roles.find(r => r.name === userRole);

    if (!roleObj) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Role not recognized"
      });
    }

    console.log(`Permissions for role ${userRole}:`, roleObj.permissions);

    // Check if the role has the required permission
    if (!roleObj.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Insufficient Permission"
      });
    }
    req.permissions = roleObj.permissions;
    console.log("Role per", req.permissions)

    next();
  };
};

export default authorisePermission;