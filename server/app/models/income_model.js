const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema(
    {
        detail: String,
    },
    {
        timestamps: true,
    },
);

const Income = mongoose.model("income", IncomeSchema);
module.exports = Income;