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

    setTimeout(() => {
      this.stage.addChild(this.shot);
    }, 10);

    setInterval(() => {
      this.move(this.xVel, this.yVel);
    }, 10);

  }

  move(xVel, yVel) {
    this.shot.x += xVel;
    this.shot.y += yVel;

    if (this.shot.y < 0 || this.shot.x < 0 ||
       this.shot.y > 700 || this.shot.x > 700) {
      this.stage.removeChild(this.shot);
    }
  }

  collideWith(enemy) {
    if (this.enemy instanceof Ship) {
      return true;
    } else {
      this.stage.removeChild(this.shot, enemy.ship);
      return true;
    }
  }

}

module.exports = Projectile;
