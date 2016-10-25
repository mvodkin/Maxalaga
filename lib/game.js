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
    }, 10)

    setInterval(() => {
      this.ship.shoot();
      // this.checkHits();
    }, 200)

    setInterval(() => {
      this.difficulty -= 1;
    }, 7000)

    setInterval(() => {
      this.enemies.forEach(enemy => enemy.shoot());
    }, 1500)

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  }

  addKeyListeners() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault()
      this.ship.setDirection(e.key, true);
      if (e.key === " ") {
        this.ship.shoot();
      }
      if (e.key === "p") {
        createjs.Ticker.paused = !createjs.Ticker.paused
      }
    });

    document.addEventListener("keyup", (e) => {
      this.ship.setDirection(e.key, false)
    });
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

  incrementScore() {
    this.score += 100;
    document.getElementById("score").textContent = this.score;
  }

  checkPlayerHits() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].isHit(this.ship);
    }
    for (let i = 0; i < this.enemyProjectiles.length; i++) {
      this.enemyProjectiles[i].isHit(this.ship);
    }
  }


  tick(event) {
    const deltaS = event.delta / 1000;
    // this.addEnemy();
    this.checkHits();
    this.checkPlayerHits();
    this.moveEnemies(deltaS)
    this.moveProjectiles(deltaS)
    this.background.move(deltaS)
    this.stage.update(event);
    // this.checkHits();
  }
}

module.exports = Game;
