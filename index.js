const express = require("express");
require("dotenv").config();
const connectToDb = require("./src/database/db");
const router = require("./src/routes");
const cors = require("cors");
const config = require("./src/config");
const createAdminUser = require("./src/utils/genarateAdmin");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
connectToDb();
createAdminUser();

app.use("/api", router);

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.listen(config.port, () => {
    console.log(`
    ------------------------------------------------
    ⚡️ Server is running on http://localhost:${config.port} ⚡️
    ------------------------------------------------`);
});
