import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/admin";
import databaseConn from "../config/db";

interface PermissionRow {
  permission_name: string;
}

function authorisePermission(permission: string) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

      const userRoleId = req.user?.role_id;

      if (!userRoleId) {
        return res.status(401).json({ message: "Unauthorized: No role found" });
      }
      console.log("The Role Based ", userRoleId);

      //  Fetch the permission_id array for the role
      const roleResult = await databaseConn.query<{ permission_id: number[] }>(
        `SELECT permission_id FROM roles WHERE role_id = $1`,
        [userRoleId]
      );

      if (roleResult.rows.length === 0) {
        return res.status(403).json({ message: "Role not found" });
      }

      const permissionIds = roleResult.rows[0].permission_id;

      if (!permissionIds || permissionIds.length === 0) {
        return res.status(403).json({ message: "No permissions assigned to this role" });
      }

    //  Fetch permission names for all permission IDs
      const permissionsResult = await databaseConn.query<PermissionRow>(
        `SELECT permission_name FROM permissionsRecord WHERE permission_id = ANY($1)`,
        [permissionIds]
      );

      const permissions = permissionsResult.rows.map((row) => row.permission_name);
      console.log("Database Role Based Auth ", permissions);
      req.permissions = permissions;
    console.log("Role permissions pass to Users", req.permissions)
     
      if (
        !permissions
          .map((p) => p.trim().toLowerCase())
          .includes(permission.trim().toLowerCase())
      ) {
      
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      console.error("Error in authorisePermission:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default authorisePermission;