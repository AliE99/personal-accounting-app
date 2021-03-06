const mongoose = require("mongoose");

const CashSchema = mongoose.Schema(
    {
        currency: String,
        amount: Number,
        userId: String,
    },
    {
        timestamps: true,
    },
);

const Cash = mongoose.model("cash", CashSchema);
module.exports = Cash;