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
	game.load.image('star', '/static/star.png');
	game.load.image("background", "static/background.jpg");
	game.load.image('balloon_r', '/static/balloon_red.png');
	game.load.image('balloon_g', '/static/balloon_green.png');
	game.load.image('balloon_b', '/static/balloon_blue.png');
	game.load.image('balloon_y', '/static/balloon_yell.png');
	game.load.image('balloon_p', '/static/balloon_purp.png');
	game.load.image("background", "/static/background.jpg");
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
var SECOND = 1000;
var BALLOON_INTERVAL = 1 * SECOND;
var MILLISECOND = 1000;
var BALLOON_INTERVAL = 1 * MILLISECOND;
const BG_DELAY = 5 * MILLISECOND;
var balloons = [];

var BALLOON_SIZE_RANGE = 1.5;
var BALLOON_SIZE_MIN = .25;

var lastSpeedChange = Date.now();
var SPEED_MIN = .5;
var speed = 3;

function update() {
	if (Date.now() - lastSpeedChange >= 20 * SECOND) {
		lastSpeedChange = Date.now();
		console.log("speed increase yo!: ", speed);
		speed++;
	}
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
		var x = Math.random() * WIDTH;
		//var y = Math.random() * HEIGHT;
		var y = HEIGHT;
		var balloon = game.add.sprite(x, y, 'balloon');
		var scale = BALLOON_SIZE_MIN + Math.random() * BALLOON_SIZE_RANGE;
		balloon.scale.setTo(scale,scale);
		var balloon = game.add.sprite(x, y, 'balloon_r');
		balloon.scale.setTo(scale, scale);
		balloon.inputEnabled = true;

		var y = Math.random() * HEIGHT;
		var balloon = game.add.sprite(x, y, 'balloon_r');;
		balloon.inputEnabled = true;
		balloon.events.onInputDown.add(popBalloon, this);
		balloon.outOfBoundsKill = true;
		balloons.push({
			g: balloon,
			speed: (Math.random() * speed) + SPEED_MIN,
		});
		lastBalloon = Date.now();
	}

	// Update bg
	if (gameTimer >= BG_DELAY && background.y < background.height - game.world.height) {
		background.y += BG_SPEED;
	}

	var i;
	for (i = 0; i < balloons.length; i++) {
		balloons[i].g.y += -1 * balloons[i].speed;
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
