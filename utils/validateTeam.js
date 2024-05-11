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

  const playerRoles = {
    WICKETKEEPER: "WK",
    BATTER: "BAT",
    "ALL-ROUNDER": "AR",
    BOWLER: "BWL",
  };

  players.forEach((player) => {
    const role = player.Role.toUpperCase();
    const playerType = playerRoles[role];
    if (playerType) {
      playerTypes[playerType]++;
    } else {
      return false; // Invalid role
    }
  });

  const playerLimits = {
    WK: [1, 8],
    BAT: [1, 8],
    AR: [1, 8],
    BWL: [1, 8],
  };

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
