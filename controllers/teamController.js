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

exports.processMatchResult = async (req, res) => {
  try {
    const matchData = parseData("data/match.json");
    const playerPoints = calculatePoints(matchData);

    console.log(playerPoints);

    const teamEntries = await TeamEntry.find();
    for (const entry of teamEntries) {
      let totalPoints = 0;
      for (const player of entry.players) {
        const points = playerPoints[player.Player] || 0;
        if (player === entry.captain) {
          totalPoints += points * 2;
        } else if (player === entry.viceCaptain) {
          totalPoints += points * 1.5;
        } else {
          totalPoints += points;
        }
      }
      console.log(totalPoints);
      entry.totalPoints = totalPoints;
      await entry.save();
    }

    res.status(200).json({ message: "Match results processed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
