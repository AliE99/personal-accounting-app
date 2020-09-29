const mongoose = require("mongoose");
const AssetSchema = mongoose.Schema(
    {
        type: String,
        value: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("asset", AssetSchema);
