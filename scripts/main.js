let inputs = document.querySelectorAll("input");
let teamTitles = document.querySelectorAll(".team-name");
let teamLogos = document.querySelectorAll(".team-logo");

// set team names for first 16 teams
for (let i = 0; i < 16; i++) {
  let j = parseInt(i / 2); // game number

  if (isEven(i)) {
    teamTitles[i].innerHTML = games[j].team1Name;
    teamLogos[i].src = "images/" + getCountry(games[j].team1Name.toLowerCase()) + ".png";
  } else {
    teamTitles[i].innerHTML = games[j].team2Name;
    teamLogos[i].src = "images/" + getCountry(games[j].team2Name.toLowerCase()) + ".png";
  }
}

// set up an event listener for every input
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    let j = parseInt(i / 2); // game number

    if (isEven(i)) {
      // clear input of next round if an update is begin performed
      if (games[j].team1 != undefined) clearInput(j + 16);

      // team A
      games[j].team1 = inputs[i].value;
      if (games[j].team2 != undefined) findWinner(j);
    } else {
      if (games[j].team2 != undefined) clearInput(j + 16);

      // team B
      games[j].team2 = inputs[i].value;
      if (games[j].team1 != undefined) findWinner(j);
    }
  });
}

/**
 * Given a game index, it compares the team scores for that game and it sets a winner.
 * @param {number} gameIndex A game identifier used to index the array of games
 */
function findWinner(gameIndex) {
  let game = games[gameIndex];
  game.winner = game.team1 - game.team2 > 0 ? game.team1Name : game.team2Name;

  if (gameIndex == 14) return; // last game

  updateTeamName(gameIndex + 16, game.winner);
  updateTeamLogo(gameIndex + 16, game.winner.toLowerCase());
  let dist = findDist(8, Math.ceil(gameIndex / 2), -1);

  if (isEven(gameIndex)) games[gameIndex + dist].team1Name = game.winner;
  else games[gameIndex + dist].team2Name = game.winner;
}

/**
 * Returns a boolean value that indicates whether the given number is even.
 * @param {number} num A numeric expression
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * Given a team index, it changes that team's name.
 * @param {number} teamIndex Index used to access a team title
 * @param {string} title New title for the team
 */
function updateTeamName(teamIndex, name) {
  teamTitles[teamIndex].innerHTML = name;
}

function updateTeamLogo(teamIndex, teamName) {
  let teamCountry = getCountry(teamName);
  teamLogos[teamIndex].src = "images/" + teamCountry + ".png";
}

/**
 * Returns a0 + n * d.
 * @param {number} a0 A numeric expression
 * @param {number} n A factor used to multiply d
 * @param {number} d A number
 */
function findDist(a0, n, d) {
  return a0 + n * d;
}

/**
 * Clears the input indexed by @code{teamIndex}.
 * @param {number} teamIndex An index to a team
 */
function clearInput(teamIndex) {
  inputs[teamIndex].value = null;
}

/**
 * Given a team identifier, returns a string with that teams country name.
 */
function getCountry(teamName) {
    if (teamName == "bar" || teamName == "rma" || teamName == "sev" || teamName == "atl") {
        return "spain"; 
    }

    if (teamName == "bay" || teamName == "bvb" || teamName == "bmg") {
        return "germany"; 
    }

    if (teamName == "psg" || teamName == "lil" || teamName == "mar") {
        return "france"; 
    }

    if (teamName == "por" || teamName == "ben") {
        return "protugal"; 
    }

    if (teamName == "liv" || teamName == "mnc" || teamName == "lei" || 
        teamName == "che" || teamName == "man") {
        return "englad"; 
    }

    if (teamName == "juv" || teamName == "laz" || teamName == "int" || teamName == "ata") {
        return "italy"; 
    }

    return "undefined";
}
