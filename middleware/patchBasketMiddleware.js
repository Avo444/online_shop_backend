const { sendResponse } = require("../helper/helper");
const { patchBasketSchema } = require("../schemas");

const patchBasketMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        if (!session.id) {
            throw new Error("You aren't logged in!");
        }
        const data = await patchBasketSchema.validateAsync(req.body);
        res.locals.body = data;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};
module.exports = patchBasketMiddleware;