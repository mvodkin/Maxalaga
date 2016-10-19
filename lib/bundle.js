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
	
	
	document.addEventListener("DOMContentLoaded", function() {
	  const ship = new Ship();
	
	  console.log("loaded");
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map