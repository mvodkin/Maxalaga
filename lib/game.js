const Ship = require("./ship.js");
const Background = require("./background.js");
const EnemyFighter = require("./enemy.js");

class Game {
  constructor() {
    this.stage = new createjs.Stage("stage");

    this.ship = new Ship(this);
    this.background = new Background(this.stage);
    this.enemies = [];
    this.projectiles = [];
    this.stage.imageSmoothingEnabled = false;
    this.enemyDelay;
    this.addEnemy = this.addEnemy.bind(this);

    setTimeout(() => {
      this.addKeyListeners();
      this.addEnemies();
    }, 10)

    setInterval(() => {
      this.ship.shoot();
      // this.checkHits();
    }, 200)

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
  }

  addKeyListeners() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault()
      this.ship.setDirection(e.key, true);
    });

    document.addEventListener("keyup", (e) => {
      this.ship.setDirection(e.key, false)
    });
  }

  addEnemies() {
    setInterval(this.addEnemy, 1000)
  }

  addEnemy() {
    const bady = new EnemyFighter(this);
  }

  moveEnemies(deltaS) {
    this.enemies.forEach(enemy => enemy.move(deltaS));
  }

  moveProjectiles(deltaS) {
    this.projectiles.forEach(projectile => projectile.move(deltaS))
  }

  checkHits() {
    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        this.projectiles[i].isHit(this.enemies[j])
      }
    }
  }


  tick(event) {
    const deltaS = event.delta / 1000;
    this.checkHits();
    this.moveEnemies(deltaS)
    this.moveProjectiles(deltaS)
    this.background.move(deltaS)
    this.stage.update(event);
    // this.checkHits();
  }
}

module.exports = Game;
