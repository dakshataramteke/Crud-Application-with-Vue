import userService from "../service/UserService";
import type { Request, Response } from "express";
import type { GetUsersParams, PaginationQuery, Users} from "../types/types";
import { PermissionRequest } from '../types/admin';

/* === Registration Form === */

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData:Users = req.body;
    const createdUser = await userService.createUserData(userData);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error in user creation:", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/* ==== Get All Users Data ==== */

// export const getUsers = async (
//   req: Request<{}, {}, {}, PaginationQuery>,
//   res: Response
// ) => {
//   try {
//     const userPermissions: string[] | undefined = req.name?.permissions;
//     const requiredPermission = "read_record";

//     if (!userPermissions || !userPermissions.includes(requiredPermission)) {
//       return res.status(403).json({
//         success: false,
//         message: "You do not have permission to view users.",
//       });
//     }
//     console.log("search", req.query);
//     const {
//       query: searchTerm,
//       page = "1",
//       limit = "10",
//       sortBy = "created_at",
//       order = "asc",
//     } = req.query;

//     const pageNum = parseInt(page, 10);
//     const limitNum = parseInt(limit, 10);

//     const params: GetUsersParams = {
//       query: searchTerm,
//       page: pageNum,
//       limit: limitNum,
//       sortBy,
//       order,
//     };
//     const users = await userService.getUsersData(params);

//     res.status(200).json({
//       success: true,
//       message: "Get User Successfully",
//       data: users,
//     });
//   } catch (error) {
//     console.error("Error in getting Data:", error);
//     res.status(500).json({
//       success: false,
//       message: (error as Error).message,
//     });
//   }
// };


export const getUsers = async (
  req:PermissionRequest,
  res: Response
) => {
  try {
    if(!req.permissions){
      console.log("User Controller no Permission found", req.permissions)
      return res.status(400).json({message:"No Permission found"})
    }
    console.log("search", req.query);
    const {
      query: searchTerm,
      page = "1",
      limit = "10",
      sortBy = "created_at",
      order = "asc",
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const params: GetUsersParams = {
      query: searchTerm,
      page: pageNum,
      limit: limitNum,
      sortBy,
      order,
    };
    const users = await userService.getUsersData(params);

    res.status(200).json({
      success: true,
      message: "Get User Successfully",
     data: {
    users: users,
    permissions: req.permissions,
  },
    });
  } catch (error) {
    console.error("Error in getting Data:", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
/* === Get Edit USers ===  */

export const getEditUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const userId = parseInt(id as string, 10);

    const getUser = await userService.getEditUser(userId);
    res.status(200).json({
      success: true,
      message: "Get User SUccessfully",
      data: getUser,
    });
  } catch (error) {
    console.error("Error in Getting Data :", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/* === Edit User === */

export const editUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const userData:Users = req.body;
    const userId = parseInt(id as string, 10);

    const editUser = await userService.editUser(userId, userData);

    res.status(200).json({
      success: true,
      message: "Edit USer Successfully",
      data: editUser,
    });
  } catch (error) {
    console.error("Error in Editing Data : ", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/* === Delete the Data === */

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id as string, 10);
    const getUser = await userService.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: "Delete User Successfully",
      data: getUser,
    });
  } catch (error) {
    console.error("Error in Deleting User:", error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
