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
import authorisePermission from '../middleware/rbacMiddleware';

router.post("/users/create" ,authorisePermission('create_record'),userValidation, createUser);
router.get("/users",authorisePermission('read_record'),getUsers);
router.get("/users/:id/edit", getEditUser);
router.put("/users/:id/edit",authorisePermission('update_record'), userValidation, editUser);
router.delete("/:id/delete", authorisePermission('delete_record'),deleteUser);

export default router;
