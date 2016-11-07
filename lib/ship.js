const Projectile = require("./projectile.js");

class Ship {
  constructor(game) {

    this.stage = game.stage;
    this.game = game;

    this.keyLeft = false;
    this.keyRight = false;
    this.keyUp = false;
    this.keyDown = false;
    this.keySpace = false;
    this.radius = 20;

    this.ship;

    this.move = this.move.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    this.manifest = [
      {src: "./assets/ship1.png", id: "ship"}
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/ship/");

  }

  handleComplete() {
    const shipImage = this.loader.getResult("ship");

    this.ship = new createjs.Shape();
    this.ship.graphics.beginBitmapFill(shipImage, "no-repeat").drawRect(0, 0, 64, 64);
    this.ship.regX = -10;
    this.ship.regY = 25;
    this.ship.x = 350;
    this.ship.y = 600;
    this.ship.setBounds(0, 0, 700, 700);

    setTimeout(() => {
      this.stage.addChild(this.ship);
    }, 500)

    setInterval(this.move, 3);

    setInterval(() => {
      this.shoot()
    }, 100)

  }

  setDirection(keyCode, boolean) {
    switch (keyCode) {
      case 37:
        this.keyLeft = boolean;
        break
      case 39:
        this.keyRight = boolean;
        break
      case 38:
        this.keyUp = boolean;
        break
      case 40:
        this.keyDown = boolean;
        break
      case 32:
        this.keySpace = boolean;
        break
      default:
        break
    }
  }

  move() {
    if (this.keyLeft && this.ship.x - 2 > -15) this.ship.x -= 2;
    if (this.keyRight && this.ship.x + 2 < 650) this.ship.x += 2;
    if (this.keyUp && this.ship.y - 2 > 20) this.ship.y -= 2;
    if (this.keyDown && this.ship.y + 2 < 680) this.ship.y += 2;
  }

  shoot() {
    let projectile;
    if (this.keySpace) {
      projectile = new Projectile({
        x: this.ship.x + 41,
        y: this.ship.y,
        xVel: 0,
        yVel: -500,
        color: "DeepSkyBlue",
        stage: this.stage,
        enemy: false,
        game: this.game
      });
    }
    if (projectile) return projectile;
  }


}

module.exports = Ship;
