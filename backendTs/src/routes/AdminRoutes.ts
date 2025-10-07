import express from "express";
const router = express.Router();
import { Login, Logout, Register } from '../controllers/AdminControllers';
import { adminValidation, LoginAdminValidation } from "../validations/adminValidations";

router.post("/admin/register",adminValidation,Register);
router.post("/admin/login",LoginAdminValidation,Login);
router.post("/admin/logout",Logout)

export default router;
