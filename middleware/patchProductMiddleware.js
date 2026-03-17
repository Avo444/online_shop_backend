const { sendResponse } = require("../helper/helper");
const { patchProductSchema } = require("../schemas");

const patchProductMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        const body = await patchProductSchema.validateAsync(req.body);
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
module.exports = patchProductMiddleware;