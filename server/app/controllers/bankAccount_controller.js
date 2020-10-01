const Account = require('../models/bankAccount_model');

exports.create = (req, res) => {
    // Create a new Account
    const account = new Account({
        name: req.body.name,
        amount: req.body.amount,
    });
    
    // Save the account in the database
    account.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while creating the Note.',
        });
    });
};

exports.findAll = (req, res) => {
    Account.find().then(accounts => {
        res.send(accounts);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while retrieving accounts.',
        });
    });
};
