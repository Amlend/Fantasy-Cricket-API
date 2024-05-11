const validateTeam = (players, captain, viceCaptain) => {
  // Validate the number of players
  if (players.length !== 11) {
    return false;
  }

  // Map to store player roles and their counts
  const playerRoles = new Map();
  for (const player of players) {
    const role = player.Role.toUpperCase();

    // Validate player role
    if (!isValidRole(role)) {
      return false;
    }

    const count = playerRoles.get(role) || 0;
    playerRoles.set(role, count + 1);
  }

  // Validate player role counts
  for (const [role, count] of playerRoles) {
    if (count < 1 || count > 8) {
      return false;
    }
  }

  // Validate captain and vice-captain are in the players list
  if (
    !players.some((player) => player.Player === captain) ||
    !players.some((player) => player.Player === viceCaptain)
  ) {
    return false;
  }

  return true;
};

function isValidRole(role) {
  return ["WICKETKEEPER", "BATTER", "ALL-ROUNDER", "BOWLER"].includes(role);
}

module.exports = validateTeam;
