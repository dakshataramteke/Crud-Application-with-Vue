import type { Request, Response } from "express";
import AdminService from "../service/AdminService";
import { Admin } from "../types/admin";


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
console.log("Login Controller",req.body);
try{
    const LoginData:Admin = req.body;
    const adminLogin = await AdminService.LoginAccount(LoginData);
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        token:adminLogin
    })
}catch(error){
    console.error("Error in Login", error);
    res.status(500).json({
        success:false,
        message:(error as Error).message
    })
}
}

