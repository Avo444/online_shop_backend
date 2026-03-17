const express = require("express");
const { usersMiddleware } = require("../middleware");
const { sendResponse } = require("../helper/helper");
const router = express.Router();

router.get("/users", usersMiddleware, (req, res) => {
    try {
        const {users} = res.locals;
        sendResponse(res, users)
    }
    catch(err) {
        sendResponse(res, {err: "Error"}, 500)
    }
})

module.exports = router