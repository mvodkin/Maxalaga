class Ship {
  constructor(stage) {

    this.stage = stage;
    // this.circle = new createjs.Shape();
    //
    // this.circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    //
    // this.circle.x = 200;
    // this.circle.y = 200;
    //
    // // this.stage.addChild(this.circle);
    // this.stage.update();
    this.keyLeft = false;
    this.keyRight = false;
    this.keyUp = false;
    this.keyDown = false;

    this.circle;

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

    this.circle = new createjs.Shape();
    this.circle.graphics.beginBitmapFill(shipImage, "no-repeat").drawRect(0, 0, 64, 64);
    this.circle.regX = 10;
    this.circle.regY = 10;

    const timeout = setTimeout(() => {
      this.stage.addChild(this.circle);
    }, 0)


    const interval = window.setInterval(this.move, 9);
  }



  setDirection(key, boolean) {
    switch (key) {
      case "ArrowLeft":
        this.keyLeft = boolean
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
      default:
        break
    }
  }

  move() {
    if (this.keyLeft) this.circle.x -= 5;
    if (this.keyRight) this.circle.x += 5;
    if (this.keyUp) this.circle.y -= 5;
    if (this.keyDown) this.circle.y += 5;
  }


}

module.exports = Ship;
