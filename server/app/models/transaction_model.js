const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
    {
        income: mongoose.Mixed,
        expense: mongoose.Mixed,
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;