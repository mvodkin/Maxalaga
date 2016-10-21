const Projectile = require("./projectile.js");

class Ship {
  constructor(stage) {

    this.stage = stage;

    this.keyLeft = false;
    this.keyRight = false;
    this.keyUp = false;
    this.keyDown = false;
    this.keySpace = false;

    this.player;

    this.move = this.move.bind(this);
    this.handleComplete = this.handleComplete.bind(this);



    this.manifest = [
      {src: "./assets/ship1.png", id: "ship"}
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/ship/");

    // this.loader.loadFile({id: "ship", src: "./assets/ship1.png"});
    // this.loader.on("fileload", this.handleComplete, this);

  }

  handleComplete() {
    const shipImage = this.loader.getResult("ship");

    this.player = new createjs.Shape();
    this.player.graphics.beginBitmapFill(shipImage, "no-repeat").drawRect(0, 0, 64, 64);
    this.player.regX = 32;
    this.player.regY = 32;
    this.player.x = 350;
    this.player.y = 600;
    this.player.setBounds(0, 0, 700, 700);

    setTimeout(() => {
      this.stage.addChild(this.player);
    }, 0)


    // const interval = window.
    setInterval(this.move, 9);

    setInterval(() => {
      this.shoot()
    }, 100)

  }




  setDirection(key, boolean) {
    switch (key) {
      case "ArrowLeft":
        this.keyLeft = boolean;
        break
      case "ArrowRight":
        this.keyRight = boolean;
        break
      case "ArrowUp":
        this.keyUp = boolean;
        break
      case "ArrowDown":
        this.keyDown = boolean;
        break
      case " ":
        this.keySpace = boolean;
        // this.shoot();
        break
      default:
        break
    }
  }

  move() {
    if (this.keyLeft && this.player.x - 5 > 20) this.player.x -= 5;
    if (this.keyRight && this.player.x + 5 < 680) this.player.x += 5;
    if (this.keyUp && this.player.y - 5 > 20) this.player.y -= 5;
    if (this.keyDown && this.player.y + 5 < 680) this.player.y += 5;
  }

  shoot() {
    if (this.keySpace) {
      const projectile = new Projectile({
        x: this.player.x,
        y: this.player.y,
        xVel: 0,
        yVel: -20,
        color: "DeepSkyBlue",
        stage: this.stage,
        enemy: false,
      });
    }
  }


}

module.exports = Ship;
