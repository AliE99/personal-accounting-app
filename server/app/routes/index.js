const express = require("express");
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
    res.send("Index Page");
});

module.exports = router;
