import express from "express";
import type { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  createUser,
  getUsers,
  getEditUser,
  editUser,
  deleteUser,
} from "../Controllers/UserControllers";
import validationSchema from "../middleware/Validation";
import { Users } from "../types/types";

const userValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result:Users = req.body;
  const { error, value } = validationSchema.validate(result);
  // console.log("User Validation Working",result);
  if (error) {
    const errorMessage = error.details?.[0]?.message || "Validation error";
    return res.status(400).json({ error: errorMessage });
  } else {
    console.log(value)
    next();
  } 
};

router.post("/users/create", userValidation, createUser);
router.get("/users", getUsers);
router.get("/users/:id/edit", getEditUser);
router.put("/users/:id/edit", userValidation, editUser);
router.delete("/:id/delete", deleteUser);

export default router;
