const Account = require("../models/bankAccount_model");
const Cash = require("../models/cash_model");

const assets = {};

// Retrieve and return all assets from the database.
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

// Retrieve and return assets of this month
exports.findByThisMonth = (req, res) => {
    const date = new Date().getMonth() + 1;
    Account.aggregate([
        {$addFields: {"month": {$month: "$createdAt"}}},
        {$match: {month: date}},
    ]).then(accounts => {
        assets.account = accounts;
        ////////////////////////////
        Cash.aggregate([
            {$addFields: {"month": {$month: "$createdAt"}}},
            {$match: {month: date}},
        ]).then(cashes => {
            assets.cash = cashes;
            res.send(assets);
        }).catch(err=>{
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

// Retrieve and return assets of the specific month
exports.findByMonth = (req, res) => {
    console.log(req.params.monthId);
    var date;
    if(typeof req.params.monthId === "undefined"){
        date = new Date().getMonth() + 1;
    }else{
        date = parseInt(req.params.monthId);
    }
    Account.aggregate([
        {$addFields: {"month": {$month: "$createdAt"}}},
        {$match: {month: date}},
    ]).then(accounts => {
        assets.account = accounts;
        ////////////////////////////
        Cash.aggregate([
            {$addFields: {"month": {$month: "$createdAt"}}},
            {$match: {month: date}},
        ]).then(cashes => {
            assets.cash = cashes;
            res.send(assets);
        }).catch(err=>{
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