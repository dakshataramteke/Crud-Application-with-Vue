import type { Request, Response, NextFunction } from "express";
import validation from '../middleware/Validation';
import { Admin, LoginAdmin } from "../types/admin";

/* === Admin Validations === */

export const adminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result:Admin = req.body;
  const {error,value} = validation.adminSchema.validate(result);
  // console.log("User Validation Working",result);
  if (error) {
    const errorMessage = error.details?.[0]?.message || "Validation error";
    return res.status(400).json({success:false, error: errorMessage });
  } else {
    console.log(value)
    next();
  } 
};

export const LoginAdminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result:LoginAdmin = req.body;
  const {error,value} = validation.loginSchema.validate(result);
  // console.log("User Validation Working",result);
  if (error) {
    const errorMessage = error.details?.[0]?.message || "Validation error";
    return res.status(400).json({success:false, error: errorMessage });
  } else {
    console.log(value)
    next();
  } 
};