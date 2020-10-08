const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
    {
        bank_name: String,
        bank_number: Number,
        amount: Number,
        currency: String,
    },
    {
        timestamps: true,
    });

const Account = mongoose.model("account", AccountSchema);
module.exports = Account;