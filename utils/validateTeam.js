const validateTeam = (players, captain, viceCaptain) => {
  if (players.length !== 11) {
    return false;
  }

  const playerTypes = {
    WK: 0,
    BAT: 0,
    AR: 0,
    BWL: 0,
  };

  const playerLimits = {
    WK: [1, 8],
    BAT: [1, 8],
    AR: [1, 8],
    BWL: [1, 8],
  };

  const teamPlayerCounts = {};

  players.forEach((player) => {
    const role = player.Role.toUpperCase();
    const playerType = role.substring(0, 3); // Extract the first 3 characters to get the player type
    if (playerType in playerTypes) {
      playerTypes[playerType]++;
      const team = player.Team;
      if (team in teamPlayerCounts) {
        teamPlayerCounts[team]++;
        if (teamPlayerCounts[team] > 10) {
          return false; // More than 10 players selected from one team
        }
      } else {
        teamPlayerCounts[team] = 1;
      }
    } else {
      return false; // Invalid role
    }
  });

  for (const type in playerTypes) {
    if (
      playerTypes[type] < playerLimits[type][0] ||
      playerTypes[type] > playerLimits[type][1]
    ) {
      return false;
    }
  }

  if (
    !players.some((player) => player.Player === captain) ||
    !players.some((player) => player.Player === viceCaptain)
  ) {
    return false;
  }

  return true;
};

module.exports = validateTeam;
