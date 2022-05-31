require('dotenv').config()

const express = require("express");

const db = require("./src/utils/mongoose");

const api = require("./src/routes/api.route");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(
    express.json({
        extended: true,
        limit: "60mb",
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "api working"
    })
});

app.use("/api", api);


app.use("*", (_, res, __) => {
    return res.status(404).send("Resource not found");
});

const port = process.env.PORT || 3000;

db.once("open", function () {
    app.listen(port, () =>
        console.log(`We up and running and listening on port: ${port}`)
    );
});
