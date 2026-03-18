const Joi = require("joi");

const patchBasketSchema = Joi.object({
    count: Joi.number().min(1)
})
    .min(1)
    .unknown(false)

module.exports = patchBasketSchema;
