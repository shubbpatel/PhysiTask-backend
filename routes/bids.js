const express = require("express");
const router = express.Router();
const { createBid,getBidsByProject } = require("../controllers/bids");

router.post("/", createBid);
router.get("/project/:projectId", getBidsByProject);


module.exports = router;
