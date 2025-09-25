import type { Request, Response } from "express";
import AdminService from "../service/AdminService";
import { Admin } from "../types/admin";
// import { protectAdmin } from "../middleware/authAdmin";
import { setCookie } from "../utils/cookies";
/* === Create an account === */

export const Register = async(req:Request, res:Response)=>{
 console.log("Admin Controller Register",req.body);
 try{
    const adminData:Admin = req.body;
    const adminRegister = await AdminService.createAccount(adminData);
    res.status(200).json({
        success:true, message: "Admin created Successfully",
        data: adminRegister
    })
 }catch(error){
    console.error("Error in Account Creation", error);
    res.status(500).json({
        success:false,
        message: (error as Error).message
    })
    
 }
}

/* === Login === */

export const Login = async(req:Request,res:Response)=>{
// console.log("Login Controller",req.body);
try{
    const LoginData:Admin = req.body;
    const token = await AdminService.LoginAccount(LoginData);
    setCookie(res,"token", token );
    console.log("Backend Cookies is",token);
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        // token:token
    })
}catch(error){
    console.error("Error in Login", error);
    res.status(500).json({
        success:false,
        message:(error as Error).message
    })
}
}

export const Token = async (req:Request,res:Response)=>{
    res.clearCookie('token');
}
