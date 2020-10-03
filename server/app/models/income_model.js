const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema(
    {
        detail: mongoose.Mixed,
    },
    {
        timestamps: true,
    },
);

const Income = mongoose.model("income", IncomeSchema);
module.exports = Income;