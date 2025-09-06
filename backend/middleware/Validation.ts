import Joi from 'joi'

const validationSchema = Joi.object({
firstName: Joi.string().required(),
lastName:Joi.string().required(),
dateOfBirth :Joi.string().required(),
mobileNumber:Joi.string().required(),
address:Joi.string().required()
})

export default validationSchema;