import express from "express";
const router = express.Router();
import {createUser,getUsers,getEditUser, editUser,deleteUser} from '../Controllers/UserControllers.js';
import validationSchema from "../middleware/Validation.js"; 

const userValidation= (req,res,next)=>{
    console.log("USer Validation Working");
    const { error, value } = validationSchema.validate(req.body);
    if (error) {
        console.error('Validation Error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message }); 
    } else {
        console.log('Validation successful. Validated data:', value);
        next();
    }
}


router.post('/users/create',userValidation,createUser);
router.get('/users',getUsers);
router.get("/users/:id/edit",getEditUser);
router.put("/users/:id/edit",userValidation,editUser);
router.delete("/:id/delete", deleteUser);

export default router;
