const express = require("express");
const router = express.Router();
const assets = require("../controllers/asset_controller");
router.get("/", assets.findAll);

module.exports = router;