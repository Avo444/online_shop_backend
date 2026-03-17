const usersMiddleware = require("./usersMiddleware");
const loginMiddleware = require("./loginMiddleware");
const sessionMiddleware = require("./sessionMiddleware");
const registerMiddleware = require("./registerMiddleware");

module.exports = { registerMiddleware, usersMiddleware, loginMiddleware, sessionMiddleware };