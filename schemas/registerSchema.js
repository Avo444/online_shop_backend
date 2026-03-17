const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
});

module.exports = registerSchema;