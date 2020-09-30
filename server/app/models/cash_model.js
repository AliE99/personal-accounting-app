const mongoose = require("mongoose");

const CashSchema = mongoose.Schema(
    {
        currency: String,
        value: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = CashSchema;
