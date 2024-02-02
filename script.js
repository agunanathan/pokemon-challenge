let score = 0;
let lives = 3;
let lifeLine = 3;
let phoneAFriendCount = 0;
let fiftyFiftyCount = 0;
let askTheAudienceCount = 0;
let choicesCounter = 0;
//let pokemonName = "x";
let pokemonName = "";
let timer = "60s";
// let choicesArray = ["a", "b", "c", "d"];
let choicesArray = [];
const pokemonNameArray = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
  "spearow",
  "fearow",
  "ekans",
  "arbok",
  "pikachu",
  "raichu",
  "sandshrew",
  "sandslash",
  "nidoran",
  "nidorina",
  "nidoqueen",
  "nidoran",
  "nidorino",
  "nidoking",
  "clefairy",
  "clefable",
  "vulpix",
  "ninetales",
  "jigglypuff",
  "wigglytuff",
  "zubat",
  "golbat",
  "oddish",
  "gloom",
  "vileplume",
  "paras",
  "parasect",
  "venonat",
  "venomoth",
  "diglett",
  "dugtrio",
  "meowth",
  "persian",
  "psyduck",
  "golduck",
  "mankey",
  "primeape",
  "growlithe",
  "arcanine",
  "poliwag",
  "poliwhirl",
  "poliwrath",
  "abra",
  "kadabra",
  "alakazam",
  "machop",
  "machoke",
  "machamp",
  "bellsprout",
  "weepinbell",
  "victreebel",
  "tentacool",
  "tentacruel",
  "geodude",
  "graveler",
  "golem",
  "ponyta",
  "rapidash",
  "slowpoke",
  "slowbro",
  "magnemite",
  "magneton",
  "farfetch'd",
  "doduo",
  "dodrio",
  "seel",
  "dewgong",
  "grimer",
  "muk",
  "shellder",
  "cloyster",
  "gastly",
  "haunter",
  "gengar",
  "onix",
  "drowzee",
  "hypno",
  "krabby",
  "kingler",
  "voltorb",
  "electrode",
  "exeggcute",
  "exeggutor",
  "cubone",
  "marowak",
  "hitmonlee",
  "hitmonchan",
  "lickitung",
  "koffing",
  "weezing",
  "rhyhorn",
  "rhydon",
  "chansey",
  "tangela",
  "kangaskhan",
  "horsea",
  "seadra",
  "goldeen",
  "seaking",
  "staryu",
  "starmie",
  "mr. mime",
  "scyther",
  "jynx",
  "electabuzz",
  "magmar",
  "pinsir",
  "tauros",
  "magikarp",
  "gyarados",
  "lapras",
  "ditto",
  "eevee",
  "vaporeon",
  "jolteon",
  "flareon",
  "porygon",
  "omanyte",
  "omastar",
  "kabuto",
  "kabutops",
  "aerodactyl",
  "snorlax",
  "articuno",
  "zapdos",
  "moltres",
  "dratini",
  "dragonair",
  "dragonite",
  "mewtwo",
  "mew",
];

function initializeQuiz() {
  document.getElementById("main-heading").innerHTML =
    "Name that Pokemon - Quiz";
  document.getElementById("generate-quiz-button").innerHTML = "Click to Start";
  document.getElementById("ask-a-friend").setAttribute("disabled", "");
  document.getElementById("fifty-fifty").setAttribute("disabled", "");
  document.getElementById("ask-audience").setAttribute("disabled", "");
  for (let i = 0; i < 5; i++) {
    let element = document.getElementById(i);
    if (element) {
      element.setAttribute("disabled", "");
    }
  }
}
async function generateQuiz(button) {
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("lives").innerHTML = "Lives: " + lives;
  document.getElementById("lifeline").innerHTML = "Lifeline: " + lifeLine;
  document.getElementById("timer").innerHTML = "Timer: " + timer;
  document.getElementById("message-board").innerHTML = "";
  document.getElementById("generate-quiz-button").setAttribute("disabled", "");
  choicesCounter = 0;
  if (phoneAFriendCount === 0)
    document.getElementById("ask-a-friend").removeAttribute("disabled");
  if (fiftyFiftyCount === 0)
    document.getElementById("fifty-fifty").removeAttribute("disabled");
  if (askTheAudienceCount === 0)
    document.getElementById("ask-audience").removeAttribute("disabled");
  for (let i = 0; i < 5; i++) {
    let element = document.getElementById(i);
    if (element) {
      element.removeAttribute("disabled");
    }
  }
  //let choicesArray=["a","b","c","d"];
  let pokemonNum = Math.floor(Math.random() * 150) + 1;
  let apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonNum}/`;
  const apiResponse = await fetch(apiURL).then((response) => response.json());
  let pokemonImage = apiResponse.sprites.front_default;
  pokemonName = apiResponse.name;

  document.getElementById("generate-quiz-button").innerHTML = "Next Challenge";
  document.getElementById("pokemon-image").src = pokemonImage;
  document.getElementById("multiple-choices").removeAttribute("hidden");

  //setup multiple choices
  choicesArray[0] = pokemonNameArray[Math.floor(Math.random() * 150) + 1];
  choicesArray[1] = pokemonNameArray[Math.floor(Math.random() * 150) + 1];
  choicesArray[2] = pokemonNameArray[Math.floor(Math.random() * 150) + 1];
  choicesArray[3] = pokemonNameArray[Math.floor(Math.random() * 150) + 1];

  //change one of them to correct answer
  correctAnswerPosition = Math.floor(Math.random() * 4) + 1;
  choicesArray[correctAnswerPosition - 1] = pokemonName;

  //set the buttons
  for (let i = 0; i < 5; i++) {
    let element = document.getElementById(i);
    if (element) {
      element.innerHTML = choicesArray[i];
      element.setAttribute("pokemon-name", choicesArray[i]);
    }
  }
  return pokemonName, choicesArray;
}

function checkAnswer(button) {
  choicesCounter = choicesCounter + 1;
  let buttonText = button.getAttribute("pokemon-name");
  if (pokemonName === buttonText) {
    document.getElementById("generate-quiz-button").removeAttribute("disabled");
    document.getElementById("message-board").innerText =
      "correct answer :" + pokemonName;
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    for (let i = 0; i < 5; i++) {
      let element = document.getElementById(i);
      if (element) {
        element.setAttribute("disabled", "");
      }
    }
  } else {
    lives -= 1;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
    button.setAttribute("disabled", "");
    if (lives === 0) {
      document
        .getElementById("generate-quiz-button")
        .setAttribute("disabled", "");
      for (let i = 0; i < 5; i++) {
        let element = document.getElementById(i);
        if (element) {
          element.setAttribute("disabled", "");
        }
      }
      if (lives < 1) {
        document.getElementById("message-board").innerText =
          "wrong answer, correct answer is: " + pokemonName;
        document.getElementById("generate-quiz-button").innerHTML = "Replay";
        lives = 3;
        lifeLine = 3;
        score = 0;
        phoneAFriendCount = 0;
        fiftyFiftyCount = 0;
        askTheAudienceCount = 0;
        choicesCounter = 0;
        document
          .getElementById("generate-quiz-button")
          .removeAttribute("disabled");
      }
      document.getElementById("ask-a-friend").setAttribute("disabled", "");
      document.getElementById("fifty-fifty").setAttribute("disabled", "");
      document.getElementById("ask-audience").setAttribute("disabled", "");
    }
  }
}

function askAFriend(button) {
  button.setAttribute("disabled", "");
  lifeLine = lifeLine - 1;
  document.getElementById("lifeline").innerHTML = "Lifeline: " + lifeLine;
  let friendAnswer = choicesArray[Math.floor(Math.random() * 4) + 1 - 1];
  document.getElementById("message-board").innerHTML =
    "Your friend says it is: " + friendAnswer;
  console.log(friendAnswer);
  phoneAFriendCount = 1;
}

function fiftyFifty(button) {
  removedCount = 0;
  if (choicesCounter === 0) {
    button.setAttribute("disabled", "");
    lifeLine = lifeLine - 1;
    document.getElementById("lifeline").innerHTML = "Lifeline: " + lifeLine;
    fiftyFiftyCount = 1;
    for (let i = 0; i < 5; i++) {
      let remove = Math.floor(Math.random() * 4) + 1 - 1;
      if (choicesArray[i] !== pokemonName && removedCount < 2) {
        document.getElementById(i).setAttribute("disabled", "");
        removedCount = removedCount + 1;
      }
    }
  } else {
    document.getElementById("message-board").innerHTML =
      "Sorry you cannot do 50-50 with less than 4 choices!";
  }
}

function askAudience(button) {
  let percentageRemaining = 100;
  let votePercentArray = [];
  let pokemonArray = [];
  for (let i = 0; i < 4; i++) {
    votePercentArray[i] =
      Math.floor(
        (percentageRemaining - Math.random() * percentageRemaining + 1) * 100
      ) / 100;
    percentageRemaining = percentageRemaining - votePercentArray[i];
  }
  button.setAttribute("disabled", "");
  lifeLine = lifeLine - 1;
  document.getElementById("lifeline").innerHTML = "Lifeline: " + lifeLine;

  for (let i = 0; i < 5; i++) {
    let element = document.getElementById(i);
    if (element) {
      nameOfPokemon = element.getAttribute("pokemon-name");
      pokemonArray[i] = nameOfPokemon;
    }
  }

  const htmlContent = pokemonArray.reduce((htmlString, currentItem, i) => {
    return htmlString + `<p>${currentItem}: ${votePercentArray[i]} votes</p>`;
  }, "");
  document.getElementById("message-board").innerHTML = htmlContent;
  askTheAudienceCount = 1;
}
