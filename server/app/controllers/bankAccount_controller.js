const Account = require("../models/bankAccount_model");
const income = require("./income_controller");
exports.create = (req, res) => {
    // Create a new Account
    const account = new Account({
        bank_name: req.body.bank_name,
        number: req.body.number,
        amount: req.body.amount,
        currency: req.body.currency || "rial",
    });
    
    // Save the Transaction
    income.SaveIncome(account,res);
    
    // Save the account in the database
    account.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Note.",
        });
    });
};

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    Account.find().then(accounts => {
        res.send(accounts);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving accounts.",
        });
    });
};

// Find a single account with a accountId
exports.findOne = (req, res) => {
    Account.findById(req.params.accountId).then(account => {
        if (!account) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId,
            });
        }
        res.send(account);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId,
            });
        }
        return res.status(500).send({
            message: "Error retrieving Account with id " + req.params.accountId,
        });
    });
    
};

// Update a Account identified by the accountId in the request
exports.update = (req, res) => {
    Account.findByIdAndUpdate(req.params.accountId, {
        bank_name: req.body.bank_name,
        amount: req.body.amount,
    }, {new: true}).then(account => {
        res.send(account);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while Updating the Account.",
        });
    });
};

// Delete a account with the specified accountId in the request
exports.delete = (req, res) => {
    Account.findByIdAndDelete(req.params.accountId).then(account => {
        if (!account) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId,
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.accountId,
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.accountId,
        });
    });
};

// Calculate the Total money stored in the bank accounts
exports.totalAmount = (req, res) => {
    Account.aggregate([
        {
            $group:
                {
                    _id: "Total Amount",
                    totalMoney: {$sum: "$amount"},
                },
        },
    ]).then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving Accounts.",
        });
    });
};