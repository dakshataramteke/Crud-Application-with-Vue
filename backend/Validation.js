const Joi = require('joi');
const validationSchema = Joi.object({
firstName: Joi.string(),
lastName:Joi.string(),
dateOfBirth :Joi.string(),
mobileNumber:Joi.string(),
address:Joi.string()

})
module.exports = validationSchema;