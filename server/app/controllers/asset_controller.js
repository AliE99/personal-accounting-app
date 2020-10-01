const Account = require("../models/bankAccount_model");
const Cash = require("../models/cash_model");

const assets = {};

exports.findAll = (req, res) => {
    // Get all of the Accounts
    Account.find().then(accounts => {
        assets.account = accounts;
        
        // Get all of the cashes
        Cash.find().then(cashes => {
            assets.cash = cashes;
            res.send(assets);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving notes.",
            });
        });
        
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving accounts.",
        });
    });
    
};