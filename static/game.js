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
	var background = game.load.image("background", "/static/background.jpg");
}

function create() {
	var background = game.add.sprite(0, 0, 'background');
	game.add.sprite(100, 100, 'star');
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function update() {
}
