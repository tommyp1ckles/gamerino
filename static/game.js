console.log("hello world");

var game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

function preload() {
	game.load.image('star', '/static/star.png');
	game.load.image("background", "/static/background.jpg");
}

//var graphics;

function create() {
	background = game.add.sprite(0, 0, 'background');
	game.add.sprite(100, 100, 'star');
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//graphics = game.add.graphics();
}
var WIDTH = 800;
var HEIGHT = 600;

var lastBalloon = Date.now();
var MILLISECOND = 1000;
var BALLOON_INTERVAL = 1 * MILLISECOND;
var balloons = [];
var 
function update() {
	if (Date.now() - lastBalloon >= BALLOON_INTERVAL) {
		graphics = game.add.graphics();
		graphics.outOfBoundsKill = true;
		graphics.lineStyle(0);
		graphics.beginFill(0xFFFF0B, 0.5);
		var x = Math.random() * WIDTH;
		var y = Math.random() * HEIGHT;
		graphics.drawEllipse(x, y, 60, 75);
		graphics.endFill();
		balloons.push({
			g: graphics,
		});
		lastBalloon = Date.now();
	}

	var i;
	for (i = 0; i < balloons.length; i++) {
		balloons[i].g.y += -1;
	}
}
