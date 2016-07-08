console.log("hello world");

var WIDTH = 800;
var HEIGHT = 600;

var game = new Phaser.Game(
  WIDTH,
  HEIGHT,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);
var background;
var score = 0;
var scoreText;

var star;

function preload() {
	game.load.image('star', '/static/star.png');
  game.load.image('balloon', '/static/balloon.png');
	game.load.image("background", "/static/background.jpg");
}

//var graphics;

function create() {
	background = game.add.sprite(0, 0, 'background');
	star = game.add.sprite(100, 100, 'star');
	game.physics.startSystem(Phaser.Physics.ARCADE);
  
  star.inputEnabled = true;
  star.events.onInputDown.add(popBalloon, this);
  
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

	//graphics = game.add.graphics();
}

var lastBalloon = Date.now();
var MILLISECOND = 1000;
var BALLOON_INTERVAL = 1 * MILLISECOND;
var balloons = [];

var BALLOON_SIZE_RANGE = 1.5;
var BALLOON_SIZE_MIN = .25;

var SPEED_MIN = .5;
var SPEED_MAX = 3.5;

function update() {
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
    var x = Math.random() * WIDTH;
    //var y = Math.random() * HEIGHT;
	var y = HEIGHT;
	var balloon = game.add.sprite(x, y, 'balloon');
	var scale = BALLOON_SIZE_MIN + Math.random() * BALLOON_SIZE_RANGE;
	balloon.scale.setTo(scale,scale);
    balloon.inputEnabled = true;

    balloon.events.onInputDown.add(popBalloon, this);
	balloon.outOfBoundsKill = true;
	balloons.push({
			g: balloon,
			speed: (Math.random() * SPEED_MAX) + SPEED_MIN,
		});
		lastBalloon = Date.now();
    
	}

	var i;
	for (i = 0; i < balloons.length; i++) {
		balloons[i].g.y += -1 * balloons[i].speed;
	}
}

function popBalloon (balloon) {
  console.log('balloon popped');
  // Remove the balloon
  // balloon.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
