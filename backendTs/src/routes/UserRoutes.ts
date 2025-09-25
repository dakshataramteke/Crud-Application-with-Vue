import express from "express";

const router = express.Router();
import {
  createUser,
  getUsers,
  getEditUser,
  editUser,
  deleteUser,
} from "../controllers/UserControllers";
import { userValidation } from "../validations/userValidations";

router.post("/users/create", userValidation, createUser);
router.get("/users", getUsers);
router.get("/users/:id/edit", getEditUser);
router.put("/users/:id/edit", userValidation, editUser);
router.delete("/:id/delete", deleteUser);

export default router;
