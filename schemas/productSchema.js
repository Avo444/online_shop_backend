const Joi = require("joi");

const productSchema = Joi.object({
    title: Joi.string().alphanum().min(3).max(20).required(),
    price: Joi.number().min(0).required(),
    count: Joi.number().min(1).required(),
    sale: Joi.number().min(0),
});

module.exports = productSchema;
