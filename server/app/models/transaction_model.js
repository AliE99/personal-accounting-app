const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
    {
        kind: String,
        amount: Number,
        source: String,
        userId: String,
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;