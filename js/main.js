var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    {
      preload: preload,
      create: create,
      update: update
    });

var sprite;
var upKey;
var downKey;
var leftKey;
var rightKey;

function preload() {
  game.load.image('girl', 'img/girl.png');
}

function create() {
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

  game.stage.backgroundColor = '#736357';
  sprite = game.add.sprite(300, 300, 'girl');
  sprite.width = 30;
  sprite.height = 50;
}

function update() {
  if (upKey.isDown) {
    sprite.y--;
  } else if (downKey.isDown) {
    sprite.y++;
  } else if (leftKey.isDown) {
    sprite.x--;
  } else if (rightKey.isDown) {
    sprite.x++;
  }
}
