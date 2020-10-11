const express = require("express");
const router = express.Router();
const transactions = require("../controllers/transaction_controller");

// Retrieve and return all transactions from the database.
router.get("/", transactions.findAll);
router.get("/month", transactions.findByMonth);
router.get("/month/:monthId", transactions.findByMonth);

// Delete a Transaction with the specified transactionId in the request
router.delete("/delete/:transactionId", transactions.delete);

module.exports = router;