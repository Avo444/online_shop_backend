const path = require("path");
const fs = require("fs").promises;

const createPath = (...arr) => path.join(path.resolve(), ...arr);

const readFile = async (path) => JSON.parse(await fs.readFile(path, "utf-8"));

const updateFile = async (path, data) =>
    fs.writeFile(path, JSON.stringify(data, null, 2));

const sendResponse = (
    res,
    data,
    statusCode = 200,
    extension = "application/json",
) => {
    res.set({
        "content-type": extension,
    }).status(statusCode);
    extension === "application/json" ? res.json(data) : res.send(data);
};

module.exports = {
    readFile,
    updateFile,
    createPath,
    sendResponse,
};
