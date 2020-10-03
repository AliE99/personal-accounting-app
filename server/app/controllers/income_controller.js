const Income = require("../models/income_model");

exports.SaveIncome = (transaction, res) => {
    const income = new Income({
        detail: transaction,
    });
    income.save().then(data => {
        console.log(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Note.",
        });
    });
};
// Retrieve and return all incomes from the database.
exports.findAll = (req, res) => {
    Income.find().then((incomes) => {
        res.send(incomes);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving Incomes.",
        });
    });
};

// Retrieve and return incomes of the specific month
exports.findByMonth = (req, res) => {
    let date;
    if (typeof req.params.monthId === "undefined") {
        date = new Date().getMonth() + 1;
    } else {
        date = parseInt(req.params.monthId);
    }
    Income.aggregate([
        {$addFields: {"month": {$month: "$updatedAt"}}},
        {$match: {month: date}},
    ]).then(incomes => {
        res.send(incomes);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving incomes.",
        });
    });
};