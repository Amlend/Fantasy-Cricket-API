const TeamEntry = require("../models/teamEntry");
const validateTeam = require("../utils/validateTeam");
const parseData = require("../utils/parseData");
const calculatePoints = require("../utils/calculatePoints");

exports.addTeamEntry = async (req, res) => {
  try {
    const { teamName, players, captain, viceCaptain } = req.body;

    // Validate team entry
    const isValid = validateTeam(players, captain, viceCaptain);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid team selection" });
    }

    // Create new team entry
    const teamEntry = new TeamEntry({
      teamName,
      players,
      captain,
      viceCaptain,
    });

    await teamEntry.save();
    res.status(201).json({ message: "Team entry added successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
