const MovingObject = require("./moving_object");
const Projectile = require("./projectile.js")
const Util = require("./util.js");

class EnemyFighter {
  constructor(game, vel) {
    this.stage = game.stage;
    this.game = game;
    this.enemies = game.enemies;
    this.move = this.move.bind(this);
    this.vel = Util.enemyVel();
    this.explosion;
    this.circle;
    this.circular = Math.random() > 0.5
    // this.ship;

    // super(options);

    this.handleComplete = this.handleComplete.bind(this);

    this.manifest = [
      {src: "./assets/bady-sprite.png", id: "ship"},
      {src: "./assets/explosion.png", id: "explosion"}
    ];

    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", this.handleComplete);
    this.loader.loadManifest(this.manifest, true, "../assets/art/");


  }

  handleComplete() {
    const badyShip = this.loader.getResult("ship")

    this.ship = new createjs.Shape();
    this.ship.graphics.beginBitmapFill(badyShip, "no-repeat").drawRect(67, 0, 40, 32);
    this.ship.y = 10;
    this.ship.x = (Math.random() * 575) + 50;
    this.ship.regX = 40;
    this.ship.regY = 0;
    this.radius = 25;

    this.circle = {centerX: this.ship.x, centerY: this.ship.y, radius: 70, angle: 0};

    setTimeout(() => {
      this.stage.addChild(this.ship);
      this.enemies.push(this);
    }, 10)

    // setInterval(() => {
    //   this.shoot();
    // }, 1000)

  }

  move(deltaS) {
    if (this.circular) {
      this.circle.centerX += (this.vel[0] * deltaS * 15);
      this.circle.centerY += (this.vel[1] * deltaS * 15);
      this.moveInCircle()
    } else {
      this.ship.x += (this.vel[0] * deltaS * 15);
      this.ship.y += (this.vel[1] * deltaS * 15);
    }

    if (this.ship.x < -30 ||
       this.ship.y > 700 || this.ship.x > 700) {
      this.stage.removeChild(this.ship);
      const idx = this.enemies.indexOf(this);
      this.enemies.splice(idx, 1);
    }
  }

  moveInCircle() {
    this.ship.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
    this.ship.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;
    this.circle.angle += 0.05;
  }

  explode() {

    const spriteSheet = new createjs.SpriteSheet({
      framerate: 7,
      images: [this.loader.getResult("explosion")],
      frames: [
        [0, 0, 37, 31],
        [43, 0, 38, 34],
        [88, 0, 41, 36],
        [139, 0, 30, 38]
      ],
      animations: {
        explode: [0, 3, "explode"]
      }
    })

    this.explosion = new createjs.Sprite(spriteSheet);
    this.explosion.x = this.ship.x + 30;
    this.explosion.y = this.ship.y;
    this.stage.addChild(this.explosion)
    setTimeout(() => {
      this.stage.removeChild(this.explosion)
    }, 500)
    this.explosion.gotoAndPlay("explode");

  }

  isHit(enemy) {
    const distance = Util.dist([this.ship.x, this.ship.y], [enemy.ship.x, enemy.ship.y]);

    if (distance < (enemy.radius)) {

      // console.log("hit!")
      // this.collideWith(enemy);
      alert("collision")
    }
  }

  shoot() {
    if (Math.random() * 100 > 80)  {
      const projectile = new Projectile({
        x: this.ship.x + 45,
        y: this.ship.y + 15,
        xVel: Math.random() * 2,
        yVel: 300,
        color: "red",
        stage: this.stage,
        enemy: true,
        game: this.game
      });
    }
  }


}

module.exports = EnemyFighter;
