const { sendResponse } = require("../helper/helper");
const loginSchema = require("../schemas/loginSchema");

const loginMiddleware = async (req, res, next) => {
    try {
        const { session } = res.locals;
        const body = await loginSchema.validateAsync(req.body);
        if (session.id) {
            throw new Error("You are already Loggined");
        }
        res.locals.body = body;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};
module.exports = loginMiddleware;
