const express = require("express");
const router = express.Router();
const assets = require("../controllers/asset_controller");

router.get("/", assets.findAll);
router.get("/month", assets.findByMonth);
router.get("/month/:monthId", assets.findByMonth);

module.exports = router;