const Ship = require("./lib/ship.js");
const Background = require("./lib/background.js");


document.addEventListener("DOMContentLoaded", function() {

  const stage = new createjs.Stage("stage");
  const ship = new Ship(stage);
  const background = new Background(stage);


  stage.canvas.imageSmoothing = false;



  document.addEventListener("keydown", (e) => {
    e.preventDefault()
    ship.setDirection(e.key, true);
  });

  document.addEventListener("keyup", (e) => {
    ship.setDirection(e.key, false)
  });


  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);

  function tick(event) {
    const deltaS = event.delta / 1000;
    background.space.y = (background.space.y + deltaS * 150) % 700;
    background.space2.y = background.space.y - 699;
    stage.update(event);
  }


  console.log("loaded");

});
