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

function preload() {
	game.load.image("background", "static/background.jpg");
	game.load.image('balloon_r', '/static/balloon_red.png');
	game.load.image('balloon_g', '/static/balloon_green.png');
	game.load.image('balloon_b', '/static/balloon_blue.png');
	game.load.image('balloon_y', '/static/balloon_yell.png');
	game.load.image('balloon_p', '/static/balloon_purp.png');
}

//var graphics;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	background = game.add.sprite(0, 0, 'background');
	background.anchor.setTo(0, 0.925);

	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

}

const FRAME_DELAY = 16;
var gameTimer = 0;

const BG_SPEED = 0.25;
var lastBalloon = Date.now();
var MILLISECOND = 1000;
var BALLOON_INTERVAL = 1 * MILLISECOND;
const BG_DELAY = 5 * MILLISECOND;
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

	// Update bg
	if (gameTimer >= BG_DELAY && background.y < background.height - game.world.height) {
		background.y += BG_SPEED;
	}

	var i;
	for (i = 0; i < balloons.length; i++) {
		balloons[i].g.y += -1;
	}

	gameTimer += FRAME_DELAY;
}

function popBalloon (balloon) {
	console.log('balloon popped');
	// Remove the balloon
	balloon.kill();

	//  Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;
}
