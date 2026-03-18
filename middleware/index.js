const putMiddleware = require("./putMiddleware");
const usersMiddleware = require("./usersMiddleware");
const loginMiddleware = require("./loginMiddleware");
const basketMiddleware = require("./basketMiddleware");
const sessionMiddleware = require("./sessionMiddleware");
const registerMiddleware = require("./registerMiddleware");
const productsMiddleware = require("./productsMiddleware");
const postBasketMiddleware = require("./postBasketMiddleware");
const postProductMiddleware = require("./addProductMiddleware");
const patchBasketMiddleware = require("./patchBasketMiddleware");
const patchProductMiddleware = require("./patchProductMiddleware");

module.exports = {
    putMiddleware,
    usersMiddleware,
    loginMiddleware,
    basketMiddleware,
    sessionMiddleware,
    registerMiddleware,
    productsMiddleware,
    postBasketMiddleware,
    patchBasketMiddleware,
    postProductMiddleware,
    patchProductMiddleware,
};
