const Ship = require("./ship.js");
const Background = require("./background.js");
const EnemyFighter = require("./enemy.js");

class Game {
  constructor() {
    this.stage = new createjs.Stage("stage");
    this.ship = new Ship(this);
    this.score = 0;
    this.background = new Background(this.stage);
    this.enemies = [];
    this.projectiles = [];
    this.stage.imageSmoothingEnabled = false;
    this.enemyProjectiles = [];
    this.enemyDelay;
    this.difficulty = 95;
    this.addEnemy = this.addEnemy.bind(this);


    setTimeout(() => {
      this.addKeyListeners();
      this.addEnemies();
    }, 0)

    setInterval(() => {
      this.difficulty -= 1;
    }, 5000)

    setInterval(() => {
      this.enemies.forEach(enemy => enemy.shoot());
    }, 1500)

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  }

  addKeyListeners() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

  }

  handleKeyDown(e) {
    e.preventDefault()
    this.ship.setDirection(e.keyCode, true);
    if (e.keyCode === "p") {
      createjs.Ticker.paused = !createjs.Ticker.paused
    }
  }

  handleKeyUp(e) {
    this.ship.setDirection(e.keyCode, false)
  }

  addEnemies() {
    setInterval(this.addEnemy, 100)
  }

  addEnemy() {
    if (Math.random() * 100 > this.difficulty) {
      const bady = new EnemyFighter(this);
    }
  }

  moveEnemies(deltaS) {
    this.enemies.forEach(enemy => enemy.move(deltaS));
  }

  moveProjectiles(deltaS) {
    this.projectiles.forEach(projectile => projectile.move(deltaS));
    this.enemyProjectiles.forEach(projectile => projectile.move(deltaS));
  }

  checkHits() {
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        this.projectiles[i].isHit(this.enemies[j])
      }
    }
  }

  handleGameOver() {
    document.getElementById("modal").style.display = "block";
    this.stage.removeAllChildren();
    document.getElementById("stage").style.display = "none";
    setTimeout(() => {
      document.location.reload(true);
    }, 4000)
  }

  checkPlayerHits() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].isHit(this.ship)) {
        this.handleGameOver();
      }
    }
    for (let i = 0; i < this.enemyProjectiles.length; i++) {
      if (this.enemyProjectiles[i].isHit(this.ship)) {
        this.handleGameOver();
      }
    }
  }

  incrementScore() {
    this.score += 100;
    const scoreBoards = document.getElementsByClassName("score");
    for (let i = 0; i < scoreBoards.length; i++) {
      scoreBoards[i].textContent = this.score;
    }
  }



  tick(event) {
    const deltaS = event.delta / 1000;
    this.checkHits();
    this.checkPlayerHits();
    this.moveEnemies(deltaS)
    this.moveProjectiles(deltaS)
    this.background.move(deltaS)
    this.stage.update(event);
  }
}

module.exports = Game;
