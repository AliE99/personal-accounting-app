const Account = require("../models/bankAccount_model");
const transaction = require("./transaction_controller");
const {body, validationResult} = require("express-validator");

// Create and Save a new Account
exports.create = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    // Check if the account already exists in the database
    Account.findOne(
        {account_number: req.body.account_number, userId: req.body.userId}).
        then(data => {
            
            // If doesn't exist => Create a new one
            if (!data) {
                // Create a new Account
                const account = new Account({
                    bank_name: req.body.bank_name,
                    account_number: req.body.account_number,
                    amount: req.body.amount,
                    currency: req.body.currency || "rial",
                    userId: req.body.userId,
                });
                
                // Save the account in the database
                account.save().then(data => {
                    transaction.saveTransaction(data, req.body.amount, res,
                        "income");
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message ||
                            "Some error occurred while creating the Note.",
                    });
                });
            }
            
            // If exists => Update it
            else {
                data.amount += parseInt(req.body.amount);
                data.save();
                
                // Save the Transaction
                transaction.saveTransaction(data, req.body.amount, res,
                    "income");
                
                res.send(data);
            }
        });
    
};

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    
    const {userId} = req.query;
    
    Account.find({userId}).then(accounts => {
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

// Deposit the money
exports.income = (req, res) => {
    const number = req.body.account_number;
    const money = req.body.amount;
    
    Account.findOne({account_number: number}).then(account => {
        account.amount += money;
        account.save();
        
        // Save the Transaction
        transaction.saveTransaction(account, money, res, "income");
        
        res.send(account);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while Saving an income.",
        });
    });
};

// Spend the money
exports.expense = (req, res) => {
    const number = req.body.account_number;
    const money = req.body.amount;
    
    Account.findOne({account_number: number}).then(account => {
        if (account.amount >= money) {
            account.amount -= money;
            account.save();
            // Save the Transaction
            transaction.saveTransaction(account, money, res, "expense");
            res.send(account);
        } else {
            return res.status(400).send({
                message: "Your amount of money is not enough",
            });
        }
        
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while Saving an expense.",
        });
    });
};

// Calculate the Total money stored in the bank accounts
exports.totalAmount = (req, res) => {
    Account.aggregate([
        {
            $group:
                {
                    _id: null,
                    total_amount: {$sum: "$amount"},
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

// Validate bank account
exports.validate = (method) => {
    switch (method) {
        case "create": {
            return [
                body("bank_name", "Enter a Valid String for Bank Name !").
                    isString().
                    exists(),
                body("account_number",
                    "Enter a Valid 16 digits Account Number").
                    isLength({min: 16, max: 16}).isInt().exists(),
                body("currency",
                    "Enter a Valid Currency(choices : rial, dollar and euro) ! ").
                    optional().
                    isIn(["rial", "dollar", "euro", "dinar"]),
                
                body("amount", "Amount of money should be a Valid Integer !").
                    isInt().
                    exists(),
            ];
        }
        case "incomeAndExpense": {
            return [
                body("account_number",
                    "Enter a Valid 16 digits Account Number").
                    isLength({min: 16, max: 16}).isInt().exists(),
                
                body("amount", "Amount of money should be a Valid Integer !").
                    isInt().
                    exists(),
            ];
        }
    }
};