const Ship = require("./ship.js")

class Background {
  constructor(stage) {
    this.stage = stage;
    this.space;
    this.space2;

    this.manifest = [
      {src: "./assets/nebula.gif", id: "space"}
    ];

    this.handleComplete = this.handleComplete.bind(this);
    this.move = this.move.bind(this);

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/art/");

  }


  handleComplete() {

    let spaceBackground = this.loader.getResult("space");
    this.space = new createjs.Shape();
    this.space.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);
    this.space.y = 0;
    this.space.scaleX = 2.18;
    this.space.scaleY = 2.18;

    this.space2 = new createjs.Shape();
    this.space2.graphics.beginBitmapFill(spaceBackground).drawRect(0, 0, 700, 700);
    this.space2.scaleY = 2.18;
    this.space2.scaleX = 2.18;

    this.space2.y = -699;
    this.stage.addChild(this.space2, this.space);

  }

  move(deltaS) {

    this.space.y = (this.space.y + deltaS * 100) % 700;
    this.space2.y = this.space.y - 699;
  }


}

module.exports = Background;
