const { nanoid } = require("nanoid");
const { sendResponse, updateFile, createPath } = require("../helper/helper");
const {
    sessionMiddleware,
    basketMiddleware,
    postBasketMiddleware,
    productsMiddleware,
    usersMiddleware,
    patchBasketMiddleware,
    putMiddleware,
} = require("../middleware");
const express = require("express");

const router = express.Router();

router.get("/basket", sessionMiddleware, basketMiddleware, (req, res) => {
    try {
        const { basket, session } = res.locals;

        const currentBasket = basket.filter(
            (basket) => basket.userID === session.id,
        );
        if (!currentBasket) {
            throw new Error("Basket is empty!");
        }

        sendResponse(res, currentBasket);
    } catch (err) {
        const error = { error: err.message };
        sendResponse(res, error, 500);
    }
});

router.get(
    "/basket/:id",
    sessionMiddleware,
    usersMiddleware,
    basketMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { basket, session, users } = res.locals;
            const user = users.find((user) => user.id === session.id);
            const currentBasket = basket.find((basket) => basket.id === id);

            if (!basket) {
                throw new Error("Basket is not found");
            }
            if (!user) {
                throw new Error("User is not found!");
            }
            if (user.role !== "admin" && currentBasket.userID !== user.id) {
                throw new Error("You are not admin!");
            }

            sendResponse(res, currentBasket);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.post(
    "/basket",
    sessionMiddleware,
    productsMiddleware,
    basketMiddleware,
    postBasketMiddleware,
    async (req, res) => {
        try {
            const { body, session, basket, products } = res.locals;
            const userBasket = basket.find(
                (basket) =>
                    basket.productID === body.productID &&
                    basket.userID === session.id,
            );
            const product = products.find(
                (product) => product.id === body.productID,
            );

            if (!product) {
                throw new Error("Product is not found!");
            }
            if (
                body.count > product.count ||
                (userBasket && userBasket.count + body.count > product.count)
            ) {
                throw new Error("Requested quantity is unavailable.");
            }
            const newBasket = {
                ...body,
                id: nanoid(6),
                userID: session.id,
            };
            if (!userBasket) {
                basket.push(newBasket);
            } else {
                userBasket.count += body.count;
            }

            await updateFile(createPath("db", "basket.json"), basket);
            sendResponse(res, userBasket ? userBasket : newBasket);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.put(
    "/basket",
    sessionMiddleware,
    usersMiddleware,
    putMiddleware,
    async (req, res) => {
        try {
            const { session, users, body } = res.locals;
            const user = users.find((user) => user.id === session.id);
            console.log(user);
            if (!user) {
                throw new Error("User is not found");
            }
            if (user.role !== "admin") {
                throw new Error("You are not admin!");
            }
            await updateFile(createPath("db", "basket.json"), body);
            sendResponse(res, body);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.patch(
    "/basket/:id",
    sessionMiddleware,
    usersMiddleware,
    basketMiddleware,
    productsMiddleware,
    patchBasketMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { users, basket, session, body, products } = res.locals;
            const currentBasket = basket.find((item) => item.id === id);

            if (!currentBasket) {
                throw new Error("Basket is not found");
            }

            const user = users.find((user) => user.id === session.id);

            const product = products.find(
                (product) => product.id === currentBasket.productID,
            );
            if (!product) {
                throw new Error("Product is not found!");
            }
            if (!user) {
                throw new Error("User is not found");
            }
            if (user.id !== currentBasket.userID && user.role !== "admin") {
                throw new Error("This is not your basket!");
            }

            currentBasket.count = body.count;

            await updateFile(createPath("db", "basket.json"), basket);
            sendResponse(res, currentBasket);
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

router.delete(
    "/basket/:id",
    sessionMiddleware,
    usersMiddleware,
    basketMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const { session, users, basket } = res.locals;

            const user = users.find((user) => user.id === session.id);
            if (!user) {
                throw new Error("User is not found!");
            }

            if (user.role !== "admin" && user.id !== basket.userID) {
                throw new Error("This is not your basket");
            }

            const currentBasket = basket.findIndex(
                (basket) => basket.id === id,
            );
            if (currentBasket === -1) {
                throw new Error("Basket is not found");
            }

            basket.splice(basket[currentBasket], 1);

            await updateFile(createPath("db", "basket.json"), basket);
            const message = {message: "Success!"};
            sendResponse(res, message)
            
        } catch (err) {
            const error = { error: err.message };
            sendResponse(res, error, 500);
        }
    },
);

module.exports = router;
