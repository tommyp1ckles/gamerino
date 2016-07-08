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
	game.load.image("background", "/static/background.jpg");
}

var graphics;

function create() {
	background = game.add.sprite(0, 0, 'background');
	star = game.add.sprite(100, 100, 'star');
	game.physics.startSystem(Phaser.Physics.ARCADE);
  
  star.inputEnabled = true;
  star.events.onInputDown.add(popBalloon, this);
  
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

	graphics = game.add.graphics();
}

var lastBalloon = Date.now();
var MILLISECOND = 1000;
var BALLOON_INTERVAL = 1 * MILLISECOND;
var balloons = [];
function update() {
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
		var balloon = game.add.graphics();
		balloon.lineStyle(0);
		balloon.beginFill(0xFFFF0B, 0.5);
		var x = Math.random() * WIDTH;
		var y = Math.random() * HEIGHT;
		balloon.drawEllipse(x, y, 60, 75);
		balloon.endFill();
		balloons.push({
			g: balloon,
			locX: x,
			locY: y,
		});
		lastBalloon = Date.now();
    
    balloon.inputEnabled = true;
    balloon.events.onInputDown.add(popBalloon, this);
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
