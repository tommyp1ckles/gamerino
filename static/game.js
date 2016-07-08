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
}

//var graphics;

function create() {
	background = game.add.sprite(0, 0, 'background');
	background.anchor.setTo(0, 0.925);

	//background.width = game.world.width;
	game.physics.startSystem(Phaser.Physics.ARCADE);

	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

	//graphics = game.add.graphics();
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
		var balloon = game.add.graphics();
		balloon.inputEnabled = true;
		balloon.events.onInputDown.add(popBalloon, this);
		balloon.outOfBoundsKill = true;
		balloon.lineStyle(0);
		balloon.beginFill(0xFFFF0B, 0.5);
		var x = Math.random() * WIDTH;
		var y = Math.random() * HEIGHT;
		balloon.drawEllipse(x, y, 60, 75);
		balloon.endFill();
		balloons.push({
			g: balloon,
		});
		lastBalloon = Date.now();

	}

	// Update bg
	if (gameTimer >= BG_DELAY && background.y < background.height - game.world.height) {
		background.y += BG_SPEED;
	} else {
		console.log("POS: ", background.y);
		console.log("OK: ", background.height);
		console.log("DEBUG: ", background.height * (0.925));
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
	// balloon.kill();

	//  Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;
}
