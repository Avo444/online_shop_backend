const { readFile, createPath, sendResponse } = require("../helper/helper");

const sessionMiddleware = async (req, res, next) => {
    try {
        const session = await readFile(createPath("db", "session.json"));
        res.locals.session = session;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 400);
    }
};

module.exports = sessionMiddleware;
