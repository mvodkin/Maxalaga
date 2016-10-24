const Util = require("./util.js");

class Projectile {
  constructor(options) {
    this.xVel = options.xVel;
    this.yVel = options.yVel;
    this.stage = options.stage;
    this.enemy = options.enemy;
    this.shot = new createjs.Shape();
    this.shot.graphics.beginFill(options.color).drawRect(0, 0, 3, 7);
    this.shot.x = options.x;
    this.shot.y = options.y;
    this.game = options.game;

    setTimeout(() => {
      this.stage.addChild(this.shot);
      this.game.projectiles.push(this);
    }, 10);

    // this.moveInterval = setInterval(() => {
    //   this.move(this.xVel, this.yVel);
    // }, 10);

  }

  move(deltaS) {
    // this.shot.x += xVel;
    this.shot.y -= (deltaS * 500);

    if (this.shot.y < 0 || this.shot.x < 0 ||
       this.shot.y > 700 || this.shot.x > 700) {
      clearInterval(this.moveInterval);
      this.stage.removeChild(this.shot);
      // const idx = this.game.projectiles.indexOf(this)
      // this.game.projectiles.splice(0, 1);
      this.game.projectiles.shift();
    }
  }

  isHit(enemy) {
    const distance = Util.dist([this.shot.x - 45, this.shot.y], [enemy.ship.x, enemy.ship.y]);
    // return distance < (2 + enemy.ship.radius)
    if (distance < (enemy.radius)) {

      // alert("hit!");

      console.log("hit!")
      this.collideWith(enemy);
    }
  }

  collideWith(enemy) {
    // if (this.enemy instanceof Ship) {
    //   return true;
    // } else {
      enemy.explode();
      this.stage.removeChild(this.shot, enemy.ship);
      const idx = this.game.projectiles.indexOf(this)
      this.game.projectiles.splice(idx, 1);
      const enemyIdx = this.game.enemies.indexOf(enemy)
      this.game.enemies.splice(enemyIdx, 1);
      return true;
    // }
  }

}

module.exports = Projectile;
