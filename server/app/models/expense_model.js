const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
    {
        detail: String,
    },
    {
        timestamps: true,
    },
);

const Expense = mongoose.model("expense", ExpenseSchema);
module.exports = Expense;