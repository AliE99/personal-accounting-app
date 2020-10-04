const Cash = require("../models/cash_model");
const transaction = require("./transaction_controller");
const {body, validationResult} = require("express-validator");

// Create and Save a new Cash
exports.create = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    // Create a Cash
    const cash = new Cash({
        currency: req.body.currency || "rial",
        amount: req.body.amount || 0,
    });
    
    //  Save the cash in the database
    cash.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Cash.",
        });
    });
    
};

// Retrieve and return all cashes from the database.
exports.findAll = (req, res) => {
    Cash.find().then((cashes) => {
        res.send(cashes);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving Cashes.",
        });
    });
};

// Find a single cash with a cashId
exports.findOne = (req, res) => {
    Cash.findById(req.params.cashId).then(cash => {
        if (!cash) {
            return res.status(404).send({
                message: "Cash not found with id " + req.params.cashId,
            });
        }
        res.send(cash);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Cash not found with id " + req.params.cashId,
            });
        }
        return res.status(500).send({
            message: "Error retrieving Cash with id " + req.params.cashId,
        });
    });
    
};

// Update a cash identified by the cashId in the request
exports.update = (req, res) => {
    Cash.findByIdAndUpdate(req.params.cashId, {
        currency: req.body.currency,
        amount: req.body.amount,
    }, {new: true}).then(cash => {
        res.send(cash);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while Updating the Cash.",
        });
    });
    // const id = req.params.cashId;
    // Cash.findOne({_id: id}, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (req.body.currency) {
    //             data.currency = req.body.currency;
    //             res.send(data);
    //         }
    //         data.save();
    //     }
    // });
    
};

// Delete a cash with the specified cashId in the request
exports.delete = (req, res) => {
    Cash.findByIdAndDelete(req.params.cashId).then(cash => {
        if (!cash) {
            return res.status(404).send({
                message: "Cash not found with id " + req.params.cashId,
            });
        }
        res.send({message: "Cash deleted successfully!"});
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Cash not found with id " + req.params.cashId,
            });
        }
        return res.status(500).send({
            message: "Could not delete Cash with id " + req.params.cashId,
        });
    });
};

// Deposit the money
exports.income = (req, res) => {
    const curr = req.body.currency;
    const money = req.body.amount;
    
    Cash.findOne({currency: curr}).then(cash => {
        cash.amount += money;
        cash.save();
        
        // Save the Transaction
        transaction.saveTransaction(cash, money, res, "income");
        
        res.send(cash);
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
    const curr = req.body.currency;
    const money = req.body.amount;
    
    Cash.findOne({currency: curr}).then(cash => {
        cash.amount -= money;
        cash.save();
        
        // Save the Transaction
        transaction.saveTransaction(cash, money, res, "expense");
        
        res.send(cash);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while Saving an Expense.",
        });
    });
};

// Calculate the Total money stored as cash
exports.totalAmount = (req, res) => {
    Cash.aggregate([
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
                "Some error occurred while retrieving Cashes.",
        });
    });
};

// Validations

//Validating methods for Cash
exports.validate = () => {
    return [
        body("currency",
            "Enter a Valid Currency(choices : rial, dollar and euro) ! ").
            exists().
            isIn(["rial", "dollar", "euro"]),
        
        body("amount", "Amount of money should be a Valid Integer !").
            isInt().
            exists(),
    ];
    
};