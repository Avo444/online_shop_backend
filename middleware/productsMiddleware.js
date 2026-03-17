const { readFile, createPath, sendResponse } = require("../helper/helper");

const productsMiddleware = async (req, res, next) => {
    try {
        const products = await readFile(createPath("db", "products.json"));
        res.locals.products = products;
        next();
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 404);
    }
};

module.exports = productsMiddleware;