const { sendResponse, readFile, createPath } = require("../helper/helper");

const basketMiddleware = async (req, res, next) => {
    try {
        const {session} = res.locals;
        if(!session.id) {
            throw new Error("You aren't logged in!")
        }

        const data = await readFile(createPath("db", "basket.json"));
        res.locals.basket = data;
        next()
    } catch (err) {
        const error = {error: err.message};
        sendResponse(res, error, 404);
    }
}

module.exports = basketMiddleware;