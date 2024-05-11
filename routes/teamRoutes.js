const express = require("express");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.post("/add-team", teamController.addTeamEntry);

module.exports = router;
