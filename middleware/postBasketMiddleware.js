const { sendResponse } = require("../helper/helper");
const { postBasketSchema } = require("../schemas");

const postBasketMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        if (!session.id) {
            throw new Error("You aren't logged in");
        }

        const data = await postBasketSchema.validateAsync(req.body);
        res.locals.body = data;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};


module.exports = postBasketMiddleware;