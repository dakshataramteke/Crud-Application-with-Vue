import Joi from 'joi'

/* === User Validation === */ 

const usersSchema = Joi.object({
firstName: Joi.string().required(),
lastName:Joi.string().required(),
dateOfBirth :Joi.string().required(),
mobileNumber:Joi.string().required(),
address:Joi.string().required()
})


/* === Admin Validation === */

const adminSchema = Joi.object({
email:Joi.string().required(),
password:Joi.string().required(),
role:Joi.string().required()
})

const loginSchema = Joi.object({
email:Joi.string().required(),
password:Joi.string().required()
})
export default {usersSchema, adminSchema, loginSchema};