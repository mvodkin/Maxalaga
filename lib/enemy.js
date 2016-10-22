const MovingObject = require("./moving_object");

class EnemyFighter {
  constructor(options = {}) {
    this.stage = options.stage;
    // this.ship;

    // super(options);

    this.handleComplete = this.handleComplete.bind(this);

    this.manifest = [
      {src: "./assets/bady-sprite.png", id: "ship"}
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/art/");


  }

  handleComplete() {
    const badyShip = this.loader.getResult("ship")
    // const spriteSheet = new createjs.SpriteSheet({
    //   framerate: 30,
    //   images: [this.loader.getResult("ship")],
    //   frames: {regX: 50, regY: 1, height: 32, width: 32, count: 1 }
    // })
    // //
    // this.ship = new createjs.Sprite(spriteSheet);
    this.ship = new createjs.Shape();
    this.ship.graphics.beginBitmapFill(badyShip, "no-repeat").drawRect(67, 0, 40, 32);
    this.ship.y = 50;
    this.ship.x = 350;
    setTimeout(() => {
      this.stage.addChild(this.ship);
    }, 1)

    setInterval(() => {
      this.move(1, 10)
    }, 50);
  }

  move(xVel, yVel) {
    this.ship.x += xVel;
    this.ship.y += yVel;
    debugger
    if (this.ship.y < 0 || this.ship.x < 0 ||
       this.ship.y > 700 || this.ship.x > 700) {
      this.stage.removeChild(this.ship);
    }
  }
}

module.exports = EnemyFighter;
