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
	const Game = __webpack_require__(7);
	
	
	document.addEventListener("DOMContentLoaded", function() {
	  const game = new Game;
	  
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
	    if (this.keyLeft && this.player.x - 5 > 20) this.player.x -= 2;
	    if (this.keyRight && this.player.x + 5 < 680) this.player.x += 2;
	    if (this.keyUp && this.player.y - 5 > 20) this.player.y -= 2;
	    if (this.keyDown && this.player.y + 5 < 680) this.player.y += 2;
	  }
	
	  shoot() {
	    let projectile;
	    if (this.keySpace) {
	      projectile = new Projectile({
	        x: this.player.x,
	        y: this.player.y,
	        xVel: 0,
	        yVel: -20,
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
	
	class Projectile {
	  constructor(options) {
	    this.xVel = options.xVel;
	    this.yVel = options.yVel;
	    this.stage = options.stage;
	    this.enemy = options.enemy;
	    this.shot = new createjs.Shape();
	    this.shot.graphics.beginFill(options.color).drawRect(0, 0, 3, 7);
	    this.shot.x = options.x;
	    this.shot.y = options.y;
	    this.game = options.game;
	
	    setTimeout(() => {
	      this.stage.addChild(this.shot);
	      this.game.projectiles.push(this);
	    }, 10);
	
	    // this.moveInterval = setInterval(() => {
	    //   this.move(this.xVel, this.yVel);
	    // }, 10);
	
	  }
	
	  move(deltaS) {
	    // this.shot.x += xVel;
	    this.shot.y -= (deltaS * 500);
	
	    if (this.shot.y < 0 || this.shot.x < 0 ||
	       this.shot.y > 700 || this.shot.x > 700) {
	      clearInterval(this.moveInterval);
	      this.stage.removeChild(this.shot);
	      // const idx = this.game.projectiles.indexOf(this)
	      // this.game.projectiles.splice(0, 1);
	      this.game.projectiles.shift();
	    }
	  }
	
	  isHit(enemy) {
	    const distance = Util.dist([this.shot.x - 45, this.shot.y], [enemy.ship.x, enemy.ship.y]);
	    // return distance < (2 + enemy.ship.radius)
	    if (distance < (enemy.radius)) {
	
	      // alert("hit!");
	      debugger
	      console.log("hit!")
	      this.collideWith(enemy);
	    }
	  }
	
	  collideWith(enemy) {
	    // if (this.enemy instanceof Ship) {
	    //   return true;
	    // } else {
	
	      this.stage.removeChild(this.shot, enemy.ship);
	      const idx = this.game.projectiles.indexOf(this)
	      this.game.projectiles.splice(idx, 1);
	      const enemyIdx = this.game.enemies.indexOf(enemy)
	      this.game.enemies.splice(enemyIdx, 1);
	      return true;
	    // }
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

	const MovingObject = __webpack_require__(6);
	const Util = __webpack_require__(3);
	
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


/***/ },
/* 6 */
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1);
	const Background = __webpack_require__(4);
	const EnemyFighter = __webpack_require__(5);
	
	class Game {
	  constructor() {
	    this.stage = new createjs.Stage("stage");
	
	    this.ship = new Ship(this);
	    this.background = new Background(this.stage);
	    this.enemies = [];
	    this.projectiles = [];
	    this.stage.imageSmoothingEnabled = false;
	    this.enemyDelay;
	    this.addEnemy = this.addEnemy.bind(this);
	
	    setTimeout(() => {
	      this.addKeyListeners();
	      this.addEnemies();
	    }, 10)
	
	    setInterval(() => {
	      this.ship.shoot();
	      // this.checkHits();
	    }, 200)
	
	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	  }
	
	  addKeyListeners() {
	    document.addEventListener("keydown", (e) => {
	      e.preventDefault()
	      this.ship.setDirection(e.key, true);
	    });
	
	    document.addEventListener("keyup", (e) => {
	      this.ship.setDirection(e.key, false)
	    });
	  }
	
	  addEnemies() {
	    setInterval(this.addEnemy, 1000)
	  }
	
	  addEnemy() {
	    const bady = new EnemyFighter(this);
	  }
	
	  moveEnemies(deltaS) {
	    this.enemies.forEach(enemy => enemy.move(deltaS));
	  }
	
	  moveProjectiles(deltaS) {
	    this.projectiles.forEach(projectile => projectile.move(deltaS))
	  }
	
	  checkHits() {
	    for (let i = 0; i < this.projectiles.length; i++) {
	      for (let j = 0; j < this.enemies.length; j++) {
	        this.projectiles[i].isHit(this.enemies[j])
	      }
	    }
	  }
	
	
	  tick(event) {
	    const deltaS = event.delta / 1000;
	    this.checkHits();
	    this.moveEnemies(deltaS)
	    this.moveProjectiles(deltaS)
	    this.background.move(deltaS)
	    this.stage.update(event);
	    // this.checkHits();
	  }
	}
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map