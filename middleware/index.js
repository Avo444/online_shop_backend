const usersMiddleware = require("./usersMiddleware");
const loginMiddleware = require("./loginMiddleware");
const sessionMiddleware = require("./sessionMiddleware");
const registerMiddleware = require("./registerMiddleware");
const productsMiddleware = require("./productsMiddleware");
const postProductMiddleware = require("./addProductMiddleware");
const putProductsMiddleware = require("./putProductsMiddleware");
const patchProductMiddleware = require("./patchProductMiddleware");

module.exports = {
    usersMiddleware,
    loginMiddleware,
    sessionMiddleware,
    productsMiddleware,
    registerMiddleware,
    postProductMiddleware,
    putProductsMiddleware,
    patchProductMiddleware,
};
