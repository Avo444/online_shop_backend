const { nanoid } = require("nanoid");
const { sendResponse, updateFile, createPath } = require("../helper/helper");
const {
    registerMiddleware,
    usersMiddleware,
    loginMiddleware,
    sessionMiddleware,
} = require("../middleware");

const express = require("express");
const router = express.Router();

router.post(
    "/register",
    usersMiddleware,
    registerMiddleware,
    async (req, res) => {
        try {
            const { body, users } = res.locals;
            const user = users.find((user) => user.email === body.email);
            if (user) {
                throw new Error("User is already exist!");
            }
            body.id = nanoid(6);
            body.role = "user";
            users.push(body);

            await updateFile(createPath("db", "users.json"), users);

            sendResponse(res, body);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.post(
    "/login",
    sessionMiddleware,
    usersMiddleware,
    loginMiddleware,
    async (req, res) => {
        try {
            const { body, users } = res.locals;
            const user = users.find((user) => user.email === body.email);
            
            if (!user) {
                throw new Error("User is not found!");
            }
            
            if (user.password !== body.password) {
                throw new Error("Wrong password!");
            }
            await updateFile(createPath("db", "session.json"), { id: user.id });
            sendResponse(res, user);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

module.exports = router;
