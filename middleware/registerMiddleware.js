const { sendResponse } = require("../helper/helper");
const { registerSchema } = require("../schemas");

const registerMiddleware = async (req, res, next) => {
    try {
        const data = await registerSchema.validateAsync(req.body);
        res.locals.body = data;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 404);
    }
};

module.exports = registerMiddleware