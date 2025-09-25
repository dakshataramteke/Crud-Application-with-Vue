import express from "express";
const router = express.Router();

import { Login, Register } from '../controllers/AdminControllers';
import { adminValidation } from "../validations/adminValidations";





router.post("/admin/register",adminValidation,Register);
router.post("/admin/login",adminValidation,Login);
// router.get("/me",protectAdmin,fetchMe)

export default router;
