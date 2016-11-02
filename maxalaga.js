const Ship = require("./lib/ship.js");
const Background = require("./lib/background.js");
const EnemyFighter = require("./lib/enemy.js");
const Game = require("./lib/game.js");

const init = () => {

  const modal = document.getElementById("intro-modal");
  const start = document.getElementById("start");


  modal.style.display = "block";


  const startGame = (e) => {
    document.getElementsByTagName("main")[0].style.display = "block";
    // e.preventDefault();

    modal.style.display = "none";
    const currentGame = new Game;
  }

  start.addEventListener("click", startGame);


}

document.addEventListener("DOMContentLoaded", init);
