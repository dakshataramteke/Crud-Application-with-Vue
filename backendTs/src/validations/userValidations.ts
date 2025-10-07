import validation  from "../middleware/Validation";
import type { Request, Response, NextFunction } from "express";
import { Users } from "../types/types";

/* === User Validations === */

export const userValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result:Users = req.body;
  const {error,value} = validation.usersSchema.validate(result);
  // console.log("User Validation Working",result);
  if (error) {
    const errorMessage = error.details?.[0]?.message || "Validation error";
    return res.status(400).json({success:false, error: errorMessage });
  } else {
    console.log(value)
    next();
  } 
};