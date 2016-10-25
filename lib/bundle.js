/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1);
	const Background = __webpack_require__(4);
	const EnemyFighter = __webpack_require__(5);
	const Game = __webpack_require__(6);
	
	
	document.addEventListener("DOMContentLoaded", function() {
	  currentGame = new Game;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Projectile = __webpack_require__(2);
	
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
	
	    // this.loader.loadFile({id: "ship", src: "./assets/ship1.png"});
	    // this.loader.on("fileload", this.handleComplete, this);
	
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
	    }, 10)
	
	    setInterval(this.move, 3);
	
	    // setInterval(() => {
	    //   this.shoot()
	    // }, 100)
	
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
	        break
	      default:
	        break
	    }
	  }
	
	  move() {
	    if (this.keyLeft && this.ship.x - 5 > 20) this.ship.x -= 2;
	    if (this.keyRight && this.ship.x + 5 < 680) this.ship.x += 2;
	    if (this.keyUp && this.ship.y - 5 > 20) this.ship.y -= 2;
	    if (this.keyDown && this.ship.y + 5 < 680) this.ship.y += 2;
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const Ship = __webpack_require__(1)
	
	class Projectile {
	  constructor(options) {
	    this.xVel = options.xVel;
	    this.yVel = options.yVel;
	    this.stage = options.stage;
	    this.enemy = options.enemy;
	    this.shot = new createjs.Shape();
	    this.drawProjectile(options.color)
	    // this.shot.graphics.beginFill(options.color).drawRect(0, 0, 3, 7);
	    this.shot.x = options.x;
	    this.shot.y = options.y;
	    this.game = options.game;
	
	    setTimeout(() => {
	      this.stage.addChild(this.shot);
	      if (this.enemy) {
	        this.game.enemyProjectiles.push(this)
	      } else {
	        this.game.projectiles.push(this);
	      }
	    }, 10);
	
	    // this.moveInterval = setInterval(() => {
	    //   this.move(this.xVel, this.yVel);
	    // }, 10);
	
	  }
	
	  drawProjectile(color) {
	    if (this.enemy) {
	      this.shot.graphics.beginFill(color).drawCircle(0, 0, 4);
	    } else {
	      this.shot.graphics.beginFill(color).drawRect(0, 0, 3, 7);
	    }
	  }
	
	  move(deltaS) {
	    // this.shot.x += xVel;
	    this.shot.y += (deltaS * this.yVel);
	    this.shot.x += (deltaS * this.xVel);
	
	    if (this.shot.y < -20 || this.shot.y > 720) {
	      this.stage.removeChild(this.shot);
	      if (this.enemy) {
	        const idx = this.game.enemyProjectiles.indexOf(this);
	        this.game.enemyProjectiles.splice(idx, 1);
	      } else {
	        this.game.projectiles.shift();
	      }
	    }
	  }
	
	  isHit(enemy) {
	    const distance = Util.dist([this.shot.x - 45, this.shot.y], [enemy.ship.x, enemy.ship.y]);
	
	    if (distance < (enemy.radius)) {
	
	      this.collideWith(enemy);
	      return true;
	    }
	  }
	
	  collideWith(enemy) {
	    if (this.enemy) {
	      // alert("game over, man! Game over!")
	      
	    } else {
	      enemy.explode();
	      this.stage.removeChild(this.shot, enemy.ship);
	      const idx = this.game.projectiles.indexOf(this)
	      this.game.projectiles.splice(idx, 1);
	      const enemyIdx = this.game.enemies.indexOf(enemy)
	      this.game.enemies.splice(enemyIdx, 1);
	      this.game.incrementScore();
	      return true;
	    }
	  }
	
	}
	
	module.exports = Projectile;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  enemyVel() {
	    let yVel = Math.random() * 2
	    yVel *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
	    return [
	      yVel,
	      (Math.random() + 2 * 4)
	    ]
	  }
	}
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1)
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(7);
	const Projectile = __webpack_require__(2)
	const Util = __webpack_require__(3);
	
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
	      // alert("collision")
	      return true;
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1);
	const Background = __webpack_require__(4);
	const EnemyFighter = __webpack_require__(5);
	// let currentGame = require("../maxalaga.js");
	
	class Game {
	  constructor() {
	    this.stage = new createjs.Stage("stage");
	
	    this.ship = new Ship(this);
	    this.score = 0;
	    this.background = new Background(this.stage);
	    this.enemies = [];
	    this.projectiles = [];
	    this.stage.imageSmoothingEnabled = false;
	    this.enemyProjectiles = [];
	    this.enemyDelay;
	    this.difficulty = 95;
	    this.addEnemy = this.addEnemy.bind(this);
	
	    setTimeout(() => {
	      this.addKeyListeners();
	      this.addEnemies();
	    }, 10)
	
	    setInterval(() => {
	      this.ship.shoot();
	      // this.checkHits();
	    }, 200)
	
	    setInterval(() => {
	      this.difficulty -= 1;
	    }, 7000)
	
	    setInterval(() => {
	      this.enemies.forEach(enemy => enemy.shoot());
	    }, 1500)
	
	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	  }
	
	  addKeyListeners() {
	    document.addEventListener("keydown", (e) => {
	      e.preventDefault()
	      this.ship.setDirection(e.key, true);
	      if (e.key === " ") {
	        this.ship.shoot();
	      }
	      if (e.key === "p") {
	        createjs.Ticker.paused = !createjs.Ticker.paused
	      }
	    });
	
	    document.addEventListener("keyup", (e) => {
	      this.ship.setDirection(e.key, false)
	    });
	  }
	
	  addEnemies() {
	    setInterval(this.addEnemy, 100)
	  }
	
	  addEnemy() {
	    if (Math.random() * 100 > this.difficulty) {
	      const bady = new EnemyFighter(this);
	    }
	  }
	
	  moveEnemies(deltaS) {
	    this.enemies.forEach(enemy => enemy.move(deltaS));
	  }
	
	  moveProjectiles(deltaS) {
	    this.projectiles.forEach(projectile => projectile.move(deltaS));
	    this.enemyProjectiles.forEach(projectile => projectile.move(deltaS));
	  }
	
	  checkHits() {
	    for (let i = 0; i < this.projectiles.length; i++) {
	      for (let j = 0; j < this.enemies.length; j++) {
	        this.projectiles[i].isHit(this.enemies[j])
	      }
	    }
	  }
	
	  checkPlayerHits() {
	    for (let i = 0; i < this.enemies.length; i++) {
	      if (this.enemies[i].isHit(this.ship)) {
	        document.getElementById("modal").style.display = "block";
	        this.stage.removeAllChildren();
	        setTimeout(() => {
	          document.location.reload(true);
	        }, 4000)
	      }
	    }
	    for (let i = 0; i < this.enemyProjectiles.length; i++) {
	      if (this.enemyProjectiles[i].isHit(this.ship)) {
	        document.getElementById("modal").style.display = "block";
	        this.stage.removeAllChildren();
	        setTimeout(() => {
	          document.location.reload(true);
	        }, 4000)
	      }
	    }
	  }
	
	  incrementScore() {
	    this.score += 100;
	    // document.getElementById("score").textContent = this.score;
	    const scoreBoards = document.getElementsByClassName("score");
	    for (let i = 0; i < scoreBoards.length; i++) {
	      scoreBoards[i].textContent = this.score;
	    }
	  }
	
	
	
	  tick(event) {
	    const deltaS = event.delta / 1000;
	    // this.addEnemy();
	    this.checkHits();
	    this.checkPlayerHits();
	    this.moveEnemies(deltaS)
	    this.moveProjectiles(deltaS)
	    this.background.move(deltaS)
	    this.stage.update(event);
	    // this.checkHits();
	  }
	}
	
	module.exports = Game;


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map