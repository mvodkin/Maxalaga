class MovingObject {
  constructor(options) {
    this.xVel = options.xVel;
    this.yVel = options.yVel;
    this.stage = options.stage;
    this.enemy = options.enemy;
    this.obj.x = options.x;
    this.obj.y = options.y;

    setTimeout(() => {
      this.stage.addChild(this.obj);
    }, 10);

    setInterval(() => {
      this.move(this.xVel, this.yVel);
    }, 10);

  }

  move(xVel, yVel) {
    this.obj.x += xVel;
    this.obj.y += yVel;

    if (this.outOfBounds(this.obj.x, this.obj.y)) {
      this.stage.removeChild(this.obj);
    }
  }

  outOfBounds(x, y) {
    return (y < 0 || x < 0 || y > 700 || x > 700);
  }

}

module.exports = MovingObject;
