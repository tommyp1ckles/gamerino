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

var multiplier;
var holyShit;
var holyShitShown = null;

function create() {
	background = game.add.sprite(0, 0, 'background');
	star = game.add.sprite(0, 0, "star");
	background.anchor.setTo(0, 0.925);

	//background.width = game.world.width;
	game.physics.startSystem(Phaser.Physics.ARCADE);

	star.inputEnabled = true;
	star.events.onInputDown.add(popBalloon, this);

	scoreText = 
		game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	multiplier = 
		game.add.text(300, 500, 'Multiplier: X2!', { fontSize: '42px', fill: '#FFFF00' });
	multiplier.alpha = 0;
	holyShit = 
		game.add.text(200, 300, "HOLY SHIT", { fontSize: '90px', fill: '#FFFF00' });
	holyShit.alpha = 0;
	//graphics = game.add.graphics();
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

var multiplierShown = null;
function update() {
	if (Date.now() - holyShitShown > 1 * SECOND) {
		console.log("????");
		holyShitShown = Date.now()
		holyShit.alpha = 0;
	} 
	if (Date.now() - multiplierShown > 5 * SECOND && 
		multiplierShown !== null) {
		multiplier.alpha = 0;
	}
	if (Date.now() - lastSpeedChange >= 20 * SECOND) {
		lastSpeedChange = Date.now();
		console.log("speed increase yo!: ", speed);
		speed++;
	}
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
		var x = Math.random() * WIDTH;
		//var y = Math.random() * HEIGHT;
		var y = HEIGHT;
		//var balloon = game.add.sprite(x, y, 'balloon');
		var scale = BALLOON_SIZE_MIN + Math.random() * BALLOON_SIZE_RANGE;
		var balloon = game.add.sprite(x, y, 'balloon_r');
		balloon.scale.setTo(scale, scale);
		balloon.inputEnabled = true;

		//var balloon = game.add.sprite(x, y, 'balloon_r');
		balloon.inputEnabled = true;
		balloon.events.onInputDown.add(popBalloon, this);
		balloon.outOfBoundsKill = true;
		balloons.push({
			g: balloon,
			speed: (Math.random() * speed) + SPEED_MIN,
			scale: scale,
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
	
	holyShit.angle += 15;
}

function popBalloon (balloon) {
	console.log('balloon popped');
	multiplierShow = Date.now();
	// Remove the balloon
	balloon.kill();
	//  Add and update the score
	mult = (1 / balloon.scale.x) * speed;
	if (mult > 10) {
		holyShit.alpha = 1;
	}
	multiplier.setText("Multiplier: X" + Math.floor(mult));
	multiplier.alpha = 1;
	score += Math.floor(10 * mult);
	scoreText.text = 'Score: ' + score;
}
