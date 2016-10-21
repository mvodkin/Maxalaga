const Ship = require("./ship.js")

class Background {
  constructor(stage) {
    this.stage = stage;
    // this.ship = new Ship(stage);
    this.space;
    this.space2;

    this.manifest = [
      {src: "./assets/1436.png", id: "space"}
    ];

    this.handleComplete = this.handleComplete.bind(this);
    this.tick = this.tick.bind(this);

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/art/");


  }


  handleComplete() {

    const spaceBackground = this.loader.getResult("space");
    this.space = new createjs.Shape();
    this.space.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);
    this.space.y = 0;

    this.space2 = new createjs.Shape();
    this.space2.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);

  
    this.space2.y = -699;
    // this.space2.x = 700;
    this.stage.addChild(this.space2, this.space);

    const interval = setInterval(() => {
      this.space.y = (this.space.y + 3) % 700;
      this.space2.y = this.space.y - 699;
    }, 10 )

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick);

    // setInterval(this.advanceBackground, 10);
  }

  tick(event) {

    const deltaS = event.delta / 1000;
    this.space.y = (this.space.y + deltaS * 100) % 700;
    this.space2.y = this.space.y - 699;
    this.stage.update(event);
  }


}

module.exports = Background;
