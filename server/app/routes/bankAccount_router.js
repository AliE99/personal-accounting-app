const express = require("express");
const router = express.Router();
const accounts = require("../controllers/bankAccount_controller");

// Create and Save a new Account
router.post("/", accounts.create);

// Retrieve and return all accounts from the database.
router.get("/", accounts.findAll);

// Find a single account with a accountId
// router.get("/:accountId", accounts.findOne);

// Update a account identified by the accountId in the request
// router.put("/:accountId", accounts.update);

// Delete a account with the specified accountId in the request
// router.delete("/:accountId", accounts.delete);

module.exports = router;
