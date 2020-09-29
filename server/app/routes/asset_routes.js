const express = require("express");
const router = express.Router();

const assets = require("../controllers/asset_controller");

// Create and Save a new Asset
router.post("/", assets.create);

// Retrieve and return all assets from the database.
router.get("/", assets.findAll);

// Find a single asset with a assetId
router.get("/:assetId", assets.findOne);

// Update a asset identified by the assetId in the request
router.put("/:assetId", assets.update);

// Delete a asset with the specified assetId in the request
router.delete("/:assetId", assets.delete);

module.exports = router;
