var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var audio = new Audio('tada.mp3');

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/farmer.png";

// chicken image
var chickenReady = false;
var chickenImage = new Image();
chickenImage.onload = function () {
	chickenReady = true;
};
chickenImage.src = "images/chicken.png";

//Speed and location
var hero = {
	speed: 225, 
x: 0,
    y: 0
};
var chicken = {
};
var chickensCaught = 0;

//Try to figure out multiplayer
var keysDown = {};
var keysUp = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function (e) {
	keysUp[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysUp[e.keyCode];
}, false);



var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	chicken.x = 30 + (Math.random() * (canvas.width - 60));
	chicken.y = 30 + (Math.random() * (canvas.height - 60));
};

// Update game objects
var update = function (modifier) {
	if (87 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (83 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (65 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (68 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	// Are they touching?
	if (
		hero.x <= (chicken.x + 32)
		&& chicken.x <= (chicken.x + 32)
		&& hero.y <= (chicken.y + 32)
		&& chicken.y <= (chicken.y + 32)
	) {
		++chickensCaught;
		reset();
         if(chickensCaught == 30) {
             audio.play();
                        alert("YOU CAUGHT ALL THE CHICKENS!");
             
                        document.location.reload();
         }
	}
};


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (chickenReady) {
		ctx.drawImage(chickenImage, chicken.x, chicken.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "22px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Chickens caught: " + chickensCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();