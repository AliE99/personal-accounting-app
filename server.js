const express = require("express");
const bodyParser = require("body-parser");
require("./server/database/db");
const app = express();

// Import Routers
const index_router = require("./server/app/routes/index");
const cash_router = require("./server/app/routes/cash_router");
const bankAcc_router = require("./server/app/routes/bankAccount_router");
const asset_router = require("./server/app/routes/asset_router");
const transaction_router = require("./server/app/routes/transaction_router");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Routes
app.use("/", index_router);
app.use("/cashes", cash_router);
app.use("/accounts", bankAcc_router);
app.use("/assets", asset_router);
app.use("/transactions",transaction_router);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
