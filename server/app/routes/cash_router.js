const express = require("express");
const router = express.Router();
const cashes = require("../controllers/cash_controller");

// Create and Save a new Cash
router.post("/", cashes.validate(),cashes.create);

// Deposit the money
router.post("/income",cashes.validate(), cashes.income);

// Spend the money
router.post("/expense",cashes.validate(), cashes.expense);

// Retrieve and return all cashes from the database.
router.get("/", cashes.findAll);

// Calculate the Total money stored as cash
router.get("/total", cashes.totalAmount);

// Find a single cash with a cashId
router.get("/:cashId", cashes.findOne);

// Update a cash identified by the cashId in the request
router.put("/:cashId", cashes.update);

// Delete a cash with the specified cashId in the request
router.delete("/:cashId", cashes.delete);

module.exports = router;
