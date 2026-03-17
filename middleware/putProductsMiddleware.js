const { sendResponse } = require("../helper/helper");
const { productsSchema } = require("../schemas");

const putProductsMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        const body = await productsSchema.validateAsync(req.body);
        if (!session.id) {
            throw new Error("You aren't logged in!");
        }
        res.locals.body = body;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};

module.exports = putProductsMiddleware;
