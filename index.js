const { authRouter, usersRouter } = require("./routes");
require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/auth", authRouter)
app.use("/api", usersRouter)

app.listen(PORT, (err) => {
    console.log(err ? err : `Server is connected in ${PORT} port`)
})