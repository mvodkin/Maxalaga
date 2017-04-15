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

	"use strict";
	
	var Ship = __webpack_require__(1);
	var Background = __webpack_require__(4);
	var EnemyFighter = __webpack_require__(5);
	var Game = __webpack_require__(7);
	
	var init = function init() {
	
	  var modal = document.getElementById("intro-modal");
	  var start = document.getElementById("start");
	
	  modal.style.display = "block";
	
	  var startGame = function startGame(e) {
	    document.getElementsByTagName("main")[0].style.display = "block";
	    // e.preventDefault();
	
	    modal.style.display = "none";
	    var currentGame = new Game();
	  };
	
	  start.addEventListener("click", startGame);
	};
	
	document.addEventListener("DOMContentLoaded", init);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Projectile = __webpack_require__(2);
	
	var Ship = function () {
	  function Ship(game) {
	    _classCallCheck(this, Ship);
	
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
	
	    this.manifest = [{ src: "./assets/ship1.png", id: "ship" }];
	
	    this.loader = new createjs.LoadQueue(false);
	    this.loader.addEventListener("complete", this.handleComplete);
	    this.loader.loadManifest(this.manifest, true, "../assets/ship/");
	  }
	
	  _createClass(Ship, [{
	    key: "handleComplete",
	    value: function handleComplete() {
	      var _this = this;
	
	      var shipImage = this.loader.getResult("ship");
	
	      this.ship = new createjs.Shape();
	      this.ship.graphics.beginBitmapFill(shipImage, "no-repeat").drawRect(0, 0, 64, 64);
	      this.ship.regX = -10;
	      this.ship.regY = 25;
	      this.ship.x = 350;
	      this.ship.y = 600;
	      this.ship.setBounds(0, 0, 700, 700);
	
	      setTimeout(function () {
	        _this.stage.addChild(_this.ship);
	      }, 500);
	
	      setInterval(this.move, 3);
	
	      setInterval(function () {
	        _this.shoot();
	      }, 100);
	    }
	  }, {
	    key: "setDirection",
	    value: function setDirection(keyCode, boolean) {
	      switch (keyCode) {
	        case 37:
	          this.keyLeft = boolean;
	          break;
	        case 39:
	          this.keyRight = boolean;
	          break;
	        case 38:
	          this.keyUp = boolean;
	          break;
	        case 40:
	          this.keyDown = boolean;
	          break;
	        case 32:
	          this.keySpace = boolean;
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      if (this.keyLeft && this.ship.x - 2 > -15) this.ship.x -= 2;
	      if (this.keyRight && this.ship.x + 2 < 650) this.ship.x += 2;
	      if (this.keyUp && this.ship.y - 2 > 20) this.ship.y -= 2;
	      if (this.keyDown && this.ship.y + 2 < 680) this.ship.y += 2;
	    }
	  }, {
	    key: "shoot",
	    value: function shoot() {
	      var projectile = void 0;
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
	  }]);
	
	  return Ship;
	}();
	
	module.exports = Ship;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(3);
	var Ship = __webpack_require__(1);
	
	var Projectile = function () {
	  function Projectile(options) {
	    var _this = this;
	
	    _classCallCheck(this, Projectile);
	
	    this.xVel = options.xVel;
	    this.yVel = options.yVel;
	    this.stage = options.stage;
	    this.enemy = options.enemy;
	    this.shot = new createjs.Shape();
	    this.drawProjectile(options.color);
	    this.shot.x = options.x;
	    this.shot.y = options.y;
	    this.game = options.game;
	
	    setTimeout(function () {
	      _this.stage.addChild(_this.shot);
	      if (_this.enemy) {
	        _this.game.enemyProjectiles.push(_this);
	      } else {
	        _this.game.projectiles.push(_this);
	      }
	    }, 10);
	  }
	
	  _createClass(Projectile, [{
	    key: "drawProjectile",
	    value: function drawProjectile(color) {
	      if (this.enemy) {
	        this.shot.graphics.beginFill(color).drawCircle(0, 0, 4);
	      } else {
	        this.shot.graphics.beginFill(color).drawRect(0, 0, 3, 7);
	      }
	    }
	  }, {
	    key: "move",
	    value: function move(deltaS) {
	      this.shot.y += deltaS * this.yVel;
	      this.shot.x += deltaS * this.xVel;
	
	      if (this.shot.y < -20 || this.shot.y > 720) {
	        this.stage.removeChild(this.shot);
	        if (this.enemy) {
	          var idx = this.game.enemyProjectiles.indexOf(this);
	          this.game.enemyProjectiles.splice(idx, 1);
	        } else {
	          this.game.projectiles.shift();
	        }
	      }
	    }
	  }, {
	    key: "isHit",
	    value: function isHit(enemy) {
	      var distance = Util.dist([this.shot.x - 45, this.shot.y], [enemy.ship.x, enemy.ship.y]);
	
	      if (distance < enemy.radius) {
	
	        this.collideWith(enemy);
	        return true;
	      }
	    }
	  }, {
	    key: "collideWith",
	    value: function collideWith(enemy) {
	      if (this.enemy) {} else {
	        enemy.explode();
	        this.stage.removeChild(this.shot, enemy.ship);
	        var idx = this.game.projectiles.indexOf(this);
	        this.game.projectiles.splice(idx, 1);
	        var enemyIdx = this.game.enemies.indexOf(enemy);
	        this.game.enemies.splice(enemyIdx, 1);
	        this.game.incrementScore();
	        return true;
	      }
	    }
	  }]);
	
	  return Projectile;
	}();
	
	module.exports = Projectile;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var Util = {
	  dist: function dist(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  },
	  enemyVel: function enemyVel() {
	    var yVel = Math.random() * 2;
	    yVel *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
	    return [yVel, Math.random() + 2 * 4];
	  }
	};
	
	module.exports = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship = __webpack_require__(1);
	
	var Background = function () {
	  function Background(stage) {
	    _classCallCheck(this, Background);
	
	    this.stage = stage;
	    this.space;
	    this.space2;
	
	    this.manifest = [{ src: "./assets/nebula.gif", id: "space" }];
	
	    this.handleComplete = this.handleComplete.bind(this);
	    this.move = this.move.bind(this);
	
	    this.loader = new createjs.LoadQueue(false);
	    this.loader.addEventListener("complete", this.handleComplete);
	    this.loader.loadManifest(this.manifest, true, "../assets/art/");
	  }
	
	  _createClass(Background, [{
	    key: "handleComplete",
	    value: function handleComplete() {
	
	      var spaceBackground = this.loader.getResult("space");
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
	  }, {
	    key: "move",
	    value: function move(deltaS) {
	
	      this.space.y = (this.space.y + deltaS * 100) % 700;
	      this.space2.y = this.space.y - 699;
	    }
	  }]);
	
	  return Background;
	}();
	
	module.exports = Background;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = __webpack_require__(6);
	var Projectile = __webpack_require__(2);
	var Util = __webpack_require__(3);
	
	var EnemyFighter = function () {
	  function EnemyFighter(game, vel) {
	    _classCallCheck(this, EnemyFighter);
	
	    this.stage = game.stage;
	    this.game = game;
	    this.enemies = game.enemies;
	    this.move = this.move.bind(this);
	    this.vel = Util.enemyVel();
	    this.explosion;
	    this.circle;
	    this.circular = Math.random() > 0.5;
	
	    this.handleComplete = this.handleComplete.bind(this);
	
	    this.manifest = [{ src: "./assets/bady-sprite.png", id: "ship" }, { src: "./assets/explosion.png", id: "explosion" }];
	
	    this.loader = new createjs.LoadQueue(false);
	    this.loader.addEventListener("complete", this.handleComplete);
	    this.loader.loadManifest(this.manifest, true, "../assets/art/");
	  }
	
	  _createClass(EnemyFighter, [{
	    key: "handleComplete",
	    value: function handleComplete() {
	      var _this = this;
	
	      var badyShip = this.loader.getResult("ship");
	
	      this.ship = new createjs.Shape();
	      this.ship.graphics.beginBitmapFill(badyShip, "no-repeat").drawRect(67, 0, 40, 32);
	      this.ship.y = 10;
	      this.ship.x = Math.random() * 575 + 50;
	      this.ship.regX = 40;
	      this.ship.regY = 0;
	      this.radius = 25;
	
	      this.circle = { centerX: this.ship.x, centerY: this.ship.y, radius: 70, angle: 0 };
	
	      setTimeout(function () {
	        _this.stage.addChild(_this.ship);
	        _this.enemies.push(_this);
	      }, 10);
	    }
	  }, {
	    key: "move",
	    value: function move(deltaS) {
	      if (this.circular) {
	        this.circle.centerX += this.vel[0] * deltaS * 15;
	        this.circle.centerY += this.vel[1] * deltaS * 15;
	        this.moveInCircle();
	      } else {
	        this.ship.x += this.vel[0] * deltaS * 15;
	        this.ship.y += this.vel[1] * deltaS * 15;
	      }
	
	      if (this.ship.x < -30 || this.ship.y > 700 || this.ship.x > 700) {
	        this.stage.removeChild(this.ship);
	        var idx = this.enemies.indexOf(this);
	        this.enemies.splice(idx, 1);
	      }
	    }
	  }, {
	    key: "moveInCircle",
	    value: function moveInCircle() {
	      this.ship.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
	      this.ship.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;
	      this.circle.angle += 0.05;
	    }
	  }, {
	    key: "explode",
	    value: function explode() {
	      var _this2 = this;
	
	      var spriteSheet = new createjs.SpriteSheet({
	        framerate: 7,
	        images: [this.loader.getResult("explosion")],
	        frames: [[0, 0, 37, 31], [43, 0, 38, 34], [88, 0, 41, 36], [139, 0, 30, 38]],
	        animations: {
	          explode: [0, 3, "explode"]
	        }
	      });
	
	      this.explosion = new createjs.Sprite(spriteSheet);
	      this.explosion.x = this.ship.x + 30;
	      this.explosion.y = this.ship.y;
	      this.stage.addChild(this.explosion);
	      setTimeout(function () {
	        _this2.stage.removeChild(_this2.explosion);
	      }, 500);
	      this.explosion.gotoAndPlay("explode");
	    }
	  }, {
	    key: "isHit",
	    value: function isHit(enemy) {
	      var distance = Util.dist([this.ship.x, this.ship.y], [enemy.ship.x, enemy.ship.y]);
	
	      if (distance < enemy.radius) {
	        return true;
	      }
	    }
	  }, {
	    key: "shoot",
	    value: function shoot() {
	      if (Math.random() * 100 > 80) {
	        var projectile = new Projectile({
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
	  }]);
	
	  return EnemyFighter;
	}();
	
	module.exports = EnemyFighter;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    var _this = this;
	
	    _classCallCheck(this, MovingObject);
	
	    this.xVel = options.xVel;
	    this.yVel = options.yVel;
	    this.stage = options.stage;
	    this.enemy = options.enemy;
	    this.obj.x = options.x;
	    this.obj.y = options.y;
	
	    setTimeout(function () {
	      _this.stage.addChild(_this.obj);
	    }, 10);
	
	    setInterval(function () {
	      _this.move(_this.xVel, _this.yVel);
	    }, 10);
	  }
	
	  _createClass(MovingObject, [{
	    key: "move",
	    value: function move(xVel, yVel) {
	      this.obj.x += xVel;
	      this.obj.y += yVel;
	
	      if (this.outOfBounds(this.obj.x, this.obj.y)) {
	        this.stage.removeChild(this.obj);
	      }
	    }
	  }, {
	    key: "outOfBounds",
	    value: function outOfBounds(x, y) {
	      return y < 0 || x < 0 || y > 700 || x > 700;
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	module.exports = MovingObject;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship = __webpack_require__(1);
	var Background = __webpack_require__(4);
	var EnemyFighter = __webpack_require__(5);
	
	var Game = function () {
	  function Game() {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
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
	
	    setTimeout(function () {
	      _this.addKeyListeners();
	      _this.addEnemies();
	    }, 0);
	
	    setInterval(function () {
	      _this.difficulty -= 1;
	    }, 5000);
	
	    setInterval(function () {
	      _this.enemies.forEach(function (enemy) {
	        return enemy.shoot();
	      });
	    }, 1500);
	
	    this.setScore(this.score);
	    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	  }
	
	  _createClass(Game, [{
	    key: "addKeyListeners",
	    value: function addKeyListeners() {
	      document.addEventListener("keydown", this.handleKeyDown.bind(this));
	      document.addEventListener("keyup", this.handleKeyUp.bind(this));
	    }
	  }, {
	    key: "handleKeyDown",
	    value: function handleKeyDown(e) {
	      e.preventDefault();
	      this.ship.setDirection(e.keyCode, true);
	      if (e.keyCode === "p") {
	        createjs.Ticker.paused = !createjs.Ticker.paused;
	      }
	    }
	  }, {
	    key: "handleKeyUp",
	    value: function handleKeyUp(e) {
	      this.ship.setDirection(e.keyCode, false);
	    }
	  }, {
	    key: "addEnemies",
	    value: function addEnemies() {
	      setInterval(this.addEnemy, 100);
	    }
	  }, {
	    key: "addEnemy",
	    value: function addEnemy() {
	      if (Math.random() * 100 > this.difficulty) {
	        var bady = new EnemyFighter(this);
	      }
	    }
	  }, {
	    key: "moveEnemies",
	    value: function moveEnemies(deltaS) {
	      this.enemies.forEach(function (enemy) {
	        return enemy.move(deltaS);
	      });
	    }
	  }, {
	    key: "moveProjectiles",
	    value: function moveProjectiles(deltaS) {
	      this.projectiles.forEach(function (projectile) {
	        return projectile.move(deltaS);
	      });
	      this.enemyProjectiles.forEach(function (projectile) {
	        return projectile.move(deltaS);
	      });
	    }
	  }, {
	    key: "checkHits",
	    value: function checkHits() {
	      for (var i = 0; i < this.projectiles.length; i++) {
	        for (var j = 0; j < this.enemies.length; j++) {
	          this.projectiles[i].isHit(this.enemies[j]);
	        }
	      }
	    }
	  }, {
	    key: "handleGameOver",
	    value: function handleGameOver() {
	      document.getElementById("modal").style.display = "block";
	      this.stage.removeAllChildren();
	      document.getElementById("stage").style.display = "none";
	      setTimeout(function () {
	        document.location.reload(true);
	      }, 4000);
	    }
	  }, {
	    key: "checkPlayerHits",
	    value: function checkPlayerHits() {
	      for (var i = 0; i < this.enemies.length; i++) {
	        if (this.enemies[i].isHit(this.ship)) {
	          this.handleGameOver();
	        }
	      }
	      for (var _i = 0; _i < this.enemyProjectiles.length; _i++) {
	        if (this.enemyProjectiles[_i].isHit(this.ship)) {
	          this.handleGameOver();
	        }
	      }
	    }
	  }, {
	    key: "incrementScore",
	    value: function incrementScore() {
	      this.score += 100;
	      this.setScore(this.score);
	      // const scoreBoards = document.getElementsByClassName("score");
	      // for (let i = 0; i < scoreBoards.length; i++) {
	      //   scoreBoards[i].textContent = this.score;
	      // }
	    }
	  }, {
	    key: "setScore",
	    value: function setScore(score) {
	      var scoreBoards = document.getElementsByClassName("score");
	      for (var i = 0; i < scoreBoards.length; i++) {
	        scoreBoards[i].textContent = score;
	      }
	    }
	  }, {
	    key: "tick",
	    value: function tick(event) {
	      var deltaS = event.delta / 1000;
	      this.checkHits();
	      this.checkPlayerHits();
	      this.moveEnemies(deltaS);
	      this.moveProjectiles(deltaS);
	      this.background.move(deltaS);
	      this.stage.update(event);
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map