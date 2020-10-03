const express = require("express");
const router = express.Router();
const incomes = require("../controllers/income_controller");

// Retrieve and return all incomes from the database.
router.get("/", incomes.findAll);
router.get("/month", incomes.findByMonth);
router.get("/month/:monthId", incomes.findByMonth);

module.exports = router;