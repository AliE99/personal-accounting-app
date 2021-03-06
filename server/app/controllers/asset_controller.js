const Account = require("../models/bankAccount_model");
const Cash = require("../models/cash_model");

const assets = {};

// Retrieve and return all assets from the database.
exports.findAll = (req, res) => {
    const {userId} = req.query;
    // Get all of the Accounts
    Account.find({userId}).then(accounts => {
        assets.account = accounts;
        
        // Get all of the cashes
        Cash.find({userId}).then(cashes => {
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

// Retrieve and return assets of the specific month
exports.findByMonth = (req, res) => {
    let date;
    if (typeof req.params.monthId === "undefined") {
        date = new Date().getMonth() + 1;
    } else {
        date = parseInt(req.params.monthId);
    }
    Account.aggregate([
        {$addFields: {"month": {$month: "$updatedAt"}}},
        {$match: {month: date}},
    ]).then(accounts => {
        assets.account = accounts;
        ////////////////////////////
        Cash.aggregate([
            {$addFields: {"month": {$month: "$updatedAt"}}},
            {$match: {month: date}},
        ]).then(cashes => {
            assets.cash = cashes;
            res.send(assets);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving cashes.",
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