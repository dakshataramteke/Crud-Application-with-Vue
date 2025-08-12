const express = require('express');
const router = express.Router();
const {createUser,getUsers,getEditUser, editUser,deleteUser} = require('../Controllers/UserControllers');
const validationSchema = require("../Validation");

const userValidation = (req,res,next)=>{
    console.log("User Validation is Working");
   const {error} = validationSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((e)=> e.message).join(",")
    res.status(500).json({ message: errMsg });
    // console.error("Validation Error",error);
   }else{
    next()
   }
}
router.post('/create',userValidation,createUser);
router.get('/', getUsers);
router.get("/:id/edit",getEditUser);
router.put("/:id/edit",editUser);
router.delete(":id/delete",userValidation, deleteUser)

module.exports = router;

// camel-case Kebab case 