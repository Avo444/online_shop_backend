const Joi = require("joi");

const postBasketSchema = Joi.object({
    productID: Joi.string().required(),
    count: Joi.number().min(1).required(),
});

module.exports = postBasketSchema;
