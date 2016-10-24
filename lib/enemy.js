const MovingObject = require("./moving_object");
const Util = require("./util.js");

class EnemyFighter {
  constructor(game) {
    this.stage = game.stage;
    this.enemies = game.enemies;
    this.move = this.move.bind(this);
    this.vel = Util.enemyVel();
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
    this.ship.y = 10;
    this.ship.x = (Math.random() * 650);
    this.ship.regX = 40;
    this.ship.regY = 0;
    this.radius = 25;

    setTimeout(() => {
      this.stage.addChild(this.ship);
      this.enemies.push(this);
    }, 10)

    // setInterval(() => {
    //   this.move(1, 10)
    // }, 50);
  }

  move(deltaS) {
    this.ship.x += (this.vel[0] * deltaS * 50);
    this.ship.y += (this.vel[1] * deltaS * 50);

    if (this.ship.y < 0 || this.ship.x < -10 ||
       this.ship.y > 700 || this.ship.x > 700) {
      this.stage.removeChild(this.ship);
      const idx = this.enemies.indexOf(this);
      this.enemies.splice(idx, 1);
    }
  }
}

module.exports = EnemyFighter;
