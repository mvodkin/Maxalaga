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
	const Background = __webpack_require__(2);
	
	
	document.addEventListener("DOMContentLoaded", function() {
	
	  const stage = new createjs.Stage("stage");
	  const ship = new Ship(stage);
	  const background = new Background(stage);
	
	
	  stage.canvas.imageSmoothing = false;
	
	
	
	  document.addEventListener("keydown", (e) => {
	    e.preventDefault()
	    ship.setDirection(e.key, true);
	  });
	
	  document.addEventListener("keyup", (e) => {
	    ship.setDirection(e.key, false)
	  });
	
	
	  createjs.Ticker.timingMode = createjs.Ticker.RAF;
	  createjs.Ticker.addEventListener("tick", tick);
	
	  function tick(event) {
	    const deltaS = event.delta / 1000;
	    background.space.y = (background.space.y + deltaS * 150) % 700;
	    background.space2.y = background.space.y - 699;
	    stage.update(event);
	  }
	
	
	  console.log("loaded");
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(1)
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map