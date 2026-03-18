const Joi = require("joi");

const patchProductSchema = Joi.object({
    title: Joi.string().alphanum().min(3).max(20),
    price: Joi.number().min(0),
    count: Joi.number().min(1),
    sale: Joi.number().min(0),
})
    .min(1)
    .unknown(false);

module.exports = patchProductSchema;
