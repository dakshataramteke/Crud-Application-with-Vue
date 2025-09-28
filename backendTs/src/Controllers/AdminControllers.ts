import type { Request, Response } from "express";
import AdminService from "../service/AdminService";
import { Admin, LoginAdmin } from "../types/admin";
import { setCookie } from "../utils/cookies";
import { encryptToken } from "../utils/crypto";

/* === Create an account === */

export const Register = async (req: Request, res: Response) => {
  console.log("Admin Controller Register", req.body);
  try {
    const adminData: Admin = req.body;
    const adminRegister = await AdminService.createAccount(adminData);
    res.status(200).json({
      success: true,
      message: "Admin created Successfully",
      data: adminRegister,
    });
  } catch (error) {
    console.error("Error in Account Creation", error as Error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/* === Login === */

export const Login = async (req: Request, res: Response) => {
  try {
    const LoginData: LoginAdmin = req.body;
    // console.log("Login Data is ", LoginData)
    const {token,user} = await AdminService.LoginAccount(LoginData);
    const roleData = user.role
    console.log("Users of Main Login Data result",roleData);
    const encrypt = encryptToken(token);
    // set cookies from utils
    setCookie(res, "token", encrypt);
    // console.log("Backend Cookies is",encrypt);
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      roleData
      
    });
  } catch (error) {
    console.error("Error in Login", error as Error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    
    });
  }
};

/* === Logout === */

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Log out Successfully",
    });
  } catch (error) {
    console.error("Error in Login", error as Error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
