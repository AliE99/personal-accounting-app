const Account = require("../models/bankAccount_model");
const Cash = require("../models/cash_model");

const assets = {};

exports.findAll = (req, res) => {
    Account.find().then(accounts => {
        assets.account = accounts;
        // res.write(accounts);
        
        ////////////////////////////////////////////////////////////////////
        Cash.find().then(cashes => {
            // res.write(cashes);
            assets.cash = accounts;
            res.send(assets);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving notes.",
            });
        });
        ////////////////////////////////////////////////////////////////////
        
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving accounts.",
        });
    });
};