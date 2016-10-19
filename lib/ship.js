class Ship {
  constructor() {
    this.stage = new createjs.Stage("stage");
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    this.circle.x = 200;
    this.circle.y = 200;
    this.stage.addChild(this.circle);
    this.stage.update();
    this.keyLeft = false;
    this.keyRight = false;
    this.keyUp = false;
    this.keyDown = false;
    this.stage.fillStyle = "black";

    createjs.Ticker.framerate = 120;
    document.addEventListener("keydown", (e) => {
      e.preventDefault()
      // this.moveInDirection(e.key);
      // this.pressedKey = e.key;
      this.setDirection(e.key, true);
    });

    document.addEventListener("keyup", (e) => {
      // this.pressedKey = null;
      this.setDirection(e.key, false)
    });

    createjs.Ticker.addEventListener("tick", (e) => {
      // this.moveInDirection(this.pressedKey)
      this.stage.update();
      // this.move()
    })

    this.move = this.move.bind(this);

    const interval = window.setInterval(this.move, 9);

    // this.canvas = document.getElementById("stage");
    // this.ctx = this.canvas.getContext('2d');
    // this.ctx.fillStyle = "black";
  }

  // moveInDirection(key) {
  //   switch (key) {
  //     case "ArrowLeft":
  //       this.circle.x -= 20;
  //       break
  //     case "ArrowRight":
  //       this.circle.x += 20;
  //       break
  //     case "ArrowUp":
  //       this.circle.y -= 20;
  //       break
  //     case "ArrowDown":
  //       this.circle.y += 20;
  //       break
  //     default:
  //       break
  //   }

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
