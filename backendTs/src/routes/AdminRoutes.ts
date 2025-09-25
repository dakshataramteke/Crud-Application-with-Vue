import express from "express";
const router = express.Router();
import { Login, Logout, Register } from '../controllers/AdminControllers';
import { adminValidation } from "../validations/adminValidations";

router.post("/admin/register",adminValidation,Register);
router.post("/admin/login",adminValidation,Login);
router.post("/admin/logout",Logout)

export default router;
