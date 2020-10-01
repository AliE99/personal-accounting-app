const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
    {
        name: String,
        amount: String,
    },
    {
        timestamps: true,
    });

const Account = mongoose.model('account', AccountSchema);
module.exports = Account;