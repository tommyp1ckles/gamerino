console.log("hello world");

var game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  '',
  { preload: preload, create: create, update: update }
);

var score = 0;
var scoreText;

var star;

function preload() {
	game.load.image('star', '/static/star.png');
	var background = game.load.image("background", "/static/background.jpg");
}

function create() {
	var background = game.add.sprite(0, 0, 'background');
	star = game.add.sprite(100, 100, 'star');
	game.physics.startSystem(Phaser.Physics.ARCADE);
  
  star.inputEnabled = true;
  star.events.onInputDown.add(popBalloon, this);
  
  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
}

function popBalloon (balloon) {
  console.log('balloon popped');
  // Remove the balloon
  // balloon.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
