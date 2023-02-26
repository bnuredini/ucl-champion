let inputs = document.querySelectorAll("input");
let teamTitles = document.querySelectorAll(".team-name");
let teamLogos = document.querySelectorAll(".team-logo");

// set team names for first 16 teams
for (let i = 0; i < 16; i++) {
  let gameIndex = parseInt(i / 2);
  let teamName = games[gameIndex][i % 2].teamName;

  teamTitles[i].innerHTML = teamName;
  teamLogos[i].src = "images/" + getCountry(teamName.toLowerCase()) + ".png";
}

// set up an event listener for every input
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    let gameIndex = parseInt(i / 2);
    let currTeamGoals = games[gameIndex][i % 2].teamGoals;

    if (currTeamGoals != undefined) clearInput(gameIndex + 16);
    games[gameIndex][i % 2].teamGoals = inputs[i].value;

    let opponentsGoals = games[gameIndex][(i + 1) % 2].teamGoals;
    if (opponentsGoals != undefined) findWinner(gameIndex);
  });
}

/**
 * Given a game index, it compares the team scores for that game and it sets a winner.
 * @param {number} gameIndex A game identifier used to index the array of games
 */
function findWinner(gameIndex) {
  let game = games[gameIndex];
  let team0Goals = game[0].teamGoals;
  let team1Goals = game[1].teamGoals;
  game[2].winner = team0Goals - team1Goals > 0 ? game[0].teamName : game[1].teamName;

  if (gameIndex == 14) return; // last game

  updateTeamName(gameIndex + 16, game[2].winner);
  updateTeamLogo(gameIndex + 16, game[2].winner.toLowerCase());
  let dist = findDist(8, Math.ceil(gameIndex / 2), -1);

  if (isEven(gameIndex)) {
    games[gameIndex + dist][0].teamName;
    game[2].winner;
    games[gameIndex + dist][0].teamName = game[2].winner;
  } else {
    games[gameIndex + dist][1].teamName = game[2].winner;
  }
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
    if (teamName == "bar" || teamName == "rma" || teamName == "sev" || 
        teamName == "atl") {
        return "spain"; 
    }

    if (teamName == "bay" || teamName == "bvb" || teamName == "bmg" || 
        teamName == "rbl" || teamName == "fra") {
        return "germany"; 
    }

    if (teamName == "psg" || teamName == "lil" || teamName == "mar") {
        return "france"; 
    }

    if (teamName == "por" || teamName == "ben") {
        return "protugal"; 
    }

    if (teamName == "liv" || teamName == "mnc" || teamName == "lei" || 
        teamName == "che" || teamName == "man" || teamName == "tot") {
        return "englad"; 
    }

    if (teamName == "juv" || teamName == "laz" || teamName == "int" || teamName == "ata" ||
        teamName == "mil" || teamName == "nap") {
        return "italy"; 
    }

    if (teamName == "bur") {
        return "belgium"; 
    }

    return "undefined";
}
