// Configuring the database
const dbConfig = require("../config/database_config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//Connecting to Database
mongoose.connect(dbConfig.url,
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});
