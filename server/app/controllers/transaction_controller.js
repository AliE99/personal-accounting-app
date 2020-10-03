const Transaction = require("../models/transaction_model");

exports.SaveIncome = (data, money, res) => {
    let log = {
        amount: money,
        currency: data.currency,
    };
    
    // Check if the data coming from a bank
    if (data.bank_name) {
        log.bank_name = data.bank_name;
        log.bank_number = data.number;
    }
    
    const transaction = new Transaction({
        income: log,
    });
    transaction.save().then(
    ).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Transaction.",
        });
    });
};

exports.SaveExpense = (data,money, res) => {
    let log = {
        amount: money,
        currency: data.currency,
    };
    
    // Check if the data coming from a bank
    if (data.bank_name) {
        log.bank_name = data.bank_name;
        log.bank_number = data.number;
    }
    
    const transaction = new Transaction({
        expense: log,
    });
    transaction.save().then(
    ).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Transaction.",
        });
    });
};

// Retrieve and return all transactions from the database.
exports.findAll = (req, res) => {
    Transaction.find().then((transactions) => {
        res.send(transactions);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving transactions.",
        });
    });
};

// Retrieve and return transactions of the specific month
exports.findByMonth = (req, res) => {
    let date;
    if (typeof req.params.monthId === "undefined") {
        date = new Date().getMonth() + 1;
    } else {
        date = parseInt(req.params.monthId);
    }
    Transaction.aggregate([
        {$addFields: {"month": {$month: "$updatedAt"}}},
        {$match: {month: date}},
    ]).then(transactions => {
        res.send(transactions);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving transactions.",
        });
    });
};