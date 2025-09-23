import express from "express";
const router = express.Router();
import type { Request, Response, NextFunction } from "express";
import { Login,Register } from "../controllers/AdminControllers";
import validation from '../middleware/Validation';
import { Admin } from "../types/admin";

/* === Admin Validations === */

const adminValidation = (
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

router.post("/admin/register",adminValidation,Register);
router.post("/admin/login",adminValidation,Login);

export default router;
