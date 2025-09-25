import type { Request, Response } from "express";
import AdminService from "../service/AdminService";
import { Admin } from "../types/admin";
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
  // console.log("Login Controller",req.body);
  try {
    const LoginData: Admin = req.body;
    const token = await AdminService.LoginAccount(LoginData);
    const encrypt = encryptToken(token);
    console.log("Encrypt Token ", encrypt);
    // set cookies from utils
    setCookie(res, "token", encrypt);
    // console.log("Backend Cookies is",token);
    res.status(200).json({
      success: true,
      message: "Login Successfully",
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
