import userService from "../service/UserService.ts";
import type { Request, Response } from "express";

/* === Registration Form === */

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
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

interface GetUsersParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

interface GetUsersQuery {
  query?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: string;
}

export const getUsers = async (
  req: Request<{}, {}, {}, GetUsersQuery>,
  res: Response
) => {
  try {
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
      data: users,
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
    const userData = req.body;
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
