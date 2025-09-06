import express from "express";
import type { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  createUser,
  getUsers,
  getEditUser,
  editUser,
  deleteUser,
} from "../Controllers/UserControllers.ts";
import validationSchema from "../middleware/Validation.ts";

interface UserData {
  name: string;
  email: string;
  age: number;
}

interface UserRequest extends Request {
  body: UserData;
}
const userValidation = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("USer Validation Working");
  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details?.[0]?.message || "Validation error";
    return res.status(400).json({ error: errorMessage });
  } else {
    console.log("Validation successful. Validated data:", value);
    next();
  }
};

router.post("/users/create", userValidation, createUser);
router.get("/users", getUsers);
router.get("/users/:id/edit", getEditUser);
router.put("/users/:id/edit", userValidation, editUser);
router.delete("/:id/delete", deleteUser);

export default router;
