const express = require("express");
const router = express.Router();
const accounts = require("../controllers/bankAccount_controller");

// Create and Save a new Account
router.post("/", accounts.validate("create"), accounts.create);

// Deposit the money
router.post("/income", accounts.income);

// Spend the money
router.post("/expense", accounts.expense);

// Retrieve and return all accounts from the database.
router.get("/", accounts.findAll);

// Calculate the Total money stored in the bank accounts
router.get("/total", accounts.totalAmount);

// Find a single account with a accountId
router.get("/:accountId", accounts.findOne);

// Update a account identified by the accountId in the request
router.put("/:accountId", accounts.update);

// Delete a account with the specified accountId in the request
router.delete("/:accountId", accounts.delete);

module.exports = router;
