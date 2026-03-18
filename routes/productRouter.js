const { nanoid } = require("nanoid");
const { sendResponse, updateFile, createPath } = require("../helper/helper");
const {
    putMiddleware,
    sessionMiddleware,
    productsMiddleware,
    postProductMiddleware,
    patchProductMiddleware,
    usersMiddleware,
} = require("../middleware");

const express = require("express");
const router = express.Router();

router.get("/products", productsMiddleware, (req, res) => {
    try {
        const { products } = res.locals;
        sendResponse(res, products);
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 500);
    }
});

router.post(
    "/products",
    sessionMiddleware,
    usersMiddleware,
    productsMiddleware,
    postProductMiddleware,
    async (req, res) => {
        try {
            const { products, body, users, session } = res.locals;
            const user = users.find((user) => user.id === session.id);
            if (user.role !== "admin") {
                throw new Error("You aren't admin!");
            }
            body.id = nanoid(6);
            body.sale = 0;
            products.push(body);

            await updateFile(createPath("db", "products.json"), products);

            sendResponse(res, body);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.put(
    "/products",
    sessionMiddleware,
    usersMiddleware,
    putMiddleware,
    async (req, res) => {
        try {
            const { body, session, users } = res.locals;
            const user = users.find((user) => user.id === session.id);
            if (user.role !== "admin") {
                throw new Error("You aren't admin!");
            }
            await updateFile(createPath("db", "products.json"), body);
            sendResponse(res, body);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.patch(
    "/products/:id",
    sessionMiddleware,
    usersMiddleware,
    productsMiddleware,
    patchProductMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { body, products, users, session } = res.locals;
            const user = users.find((user) => user.id === session.id);
            if (user.role !== "admin") {
                throw new Error("You aren't admin!");
            }
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) {
                throw new Error("Product isn't found");
            }

            products[index] = {
                ...products[index],
                ...body,
            };

            await updateFile(createPath("db", "products.json"), products);
            sendResponse(res, products[index]);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.delete(
    "/products/:id",
    sessionMiddleware,
    usersMiddleware,
    productsMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { products, session, users } = res.locals;

            const user = users.find((user) => user.id === session.id);
            if (user.role !== "admin") {
                throw new Error("You aren't admin!");
            }

            const product = products.find((product) => product.id === id);
            if (!product) {
                throw new Error("product is not found");
            }
            const filtered = products.filter((product) => product.id !== id);
            await updateFile(createPath("db", "products.json"), filtered);

            const message = { message: "Success!" };
            sendResponse(res, message);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

module.exports = router;
