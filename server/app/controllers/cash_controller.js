const Cash = require("../models/cash_model");
const income = require("./transaction_controller");

// Create and Save a new Cash
exports.create = (req, res) => {
    
    // Create a Cash
    const cash = new Cash({
        currency: req.body.currency || "rial",
        amount: req.body.amount || 0,
    });
    
    // Save the Transaction
    income.SaveIncome(cash, res);
    
    //  Save the cash in the database
    cash.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Note.",
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
                message: "Note not found with id " + req.params.cashId,
            });
        }
        res.send(cash);
    }).catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.cashId,
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.cashId,
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
                "Some error occurred while Updating the Note.",
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
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.cashId,
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.cashId,
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