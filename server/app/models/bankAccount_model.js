const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
    {
        bank_name: String,
        account_number: Number,
        amount: Number,
        currency: String,
        userId: String,
    },
    {
        timestamps: true,
    });

const Account = mongoose.model("account", AccountSchema);
module.exports = Account;