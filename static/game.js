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
  game.load.image('balloon_r', '/static/balloon_red.png');
  game.load.image('balloon_g', '/static/balloon_green.png');
  game.load.image('balloon_b', '/static/balloon_blue.png');
  game.load.image('balloon_y', '/static/balloon_yell.png');
  game.load.image('balloon_p', '/static/balloon_purp.png');
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
function update() {
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;
		var balloon = game.add.sprite(x, y, 'balloon_r');;
    balloon.inputEnabled = true;
    balloon.events.onInputDown.add(popBalloon, this);
		balloon.outOfBoundsKill = true;
		balloons.push({
			g: balloon,
		});
		lastBalloon = Date.now();
    
	}

	var i;
	for (i = 0; i < balloons.length; i++) {
		balloons[i].g.y += -1;
	}
}

function popBalloon (balloon) {
  console.log('balloon popped');
  // Remove the balloon
  balloon.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
