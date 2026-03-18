const { sendResponse } = require("../helper/helper");
const { putSchema } = require("../schemas");

const putMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        if (!session.id) {
            throw new Error("You aren't logged in!");
        }
        
        const body = await putSchema.validateAsync(req.body);
        res.locals.body = body;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};

module.exports = putMiddleware;
