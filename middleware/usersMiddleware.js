const { readFile, createPath, sendResponse } = require("../helper/helper")

const usersMiddleware  = async (req, res, next) => {
    try {
        const users = await readFile(createPath("db", "users.json"));
        res.locals.users = users;
        next()
    } catch (err) {
        const error = {error: err.message};
        sendResponse(res, error, 500)
    }
}

module.exports = usersMiddleware;