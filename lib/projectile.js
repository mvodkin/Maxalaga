const Util = require("./util.js");
const Ship = require("./ship.js")

class Projectile {
  constructor(options) {
    this.xVel = options.xVel;
    this.yVel = options.yVel;
    this.stage = options.stage;
    this.enemy = options.enemy;
    this.shot = new createjs.Shape();
    this.drawProjectile(options.color)
    // this.shot.graphics.beginFill(options.color).drawRect(0, 0, 3, 7);
    this.shot.x = options.x;
    this.shot.y = options.y;
    this.game = options.game;

    setTimeout(() => {
      this.stage.addChild(this.shot);
      if (this.enemy) {
        this.game.enemyProjectiles.push(this)
      } else {
        this.game.projectiles.push(this);
      }
    }, 10);

    // this.moveInterval = setInterval(() => {
    //   this.move(this.xVel, this.yVel);
    // }, 10);

  }

  drawProjectile(color) {
    if (this.enemy) {
      this.shot.graphics.beginFill(color).drawCircle(0, 0, 4);
    } else {
      this.shot.graphics.beginFill(color).drawRect(0, 0, 3, 7);
    }
  }

  move(deltaS) {
    // this.shot.x += xVel;
    this.shot.y += (deltaS * this.yVel);
    this.shot.x += (deltaS * this.xVel);

    if (this.shot.y < -20 || this.shot.y > 720) {
      this.stage.removeChild(this.shot);
      if (this.enemy) {
        const idx = this.game.enemyProjectiles.indexOf(this);
        this.game.enemyProjectiles.splice(idx, 1);
      } else {
        this.game.projectiles.shift();
      }
    }
  }

  isHit(enemy) {
    const distance = Util.dist([this.shot.x - 45, this.shot.y], [enemy.ship.x, enemy.ship.y]);

    if (distance < (enemy.radius)) {

      this.collideWith(enemy);
      return true;
    }
  }

  collideWith(enemy) {
    if (this.enemy) {
      // alert("game over, man! Game over!")
      
    } else {
      enemy.explode();
      this.stage.removeChild(this.shot, enemy.ship);
      const idx = this.game.projectiles.indexOf(this)
      this.game.projectiles.splice(idx, 1);
      const enemyIdx = this.game.enemies.indexOf(enemy)
      this.game.enemies.splice(enemyIdx, 1);
      this.game.incrementScore();
      return true;
    }
  }

}

module.exports = Projectile;
