const CAMERA_WIDTH = 800;
const CAMERA_HEIGHT = 600;
const WORLD_WIDTH = 700;
const WORLD_HEIGHT = 800;
const MOVE_SPEED = 200;

const config = {
  type: Phaser.AUTO,
  width: CAMERA_WIDTH,
  height: CAMERA_HEIGHT,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preloadFn,
    create: createFn,
    update: updateFn
  }
};
const game = new Phaser.Game(config);
var cursors;
var patty;
var blockList;

function preloadFn() {
  this.load.image('gift', 'img/gift.png');
  this.load.image('girl', 'img/girl.png');
  this.load.image('wood', 'img/wood.jpg');
}

function createFn() {
  this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  this.add.tileSprite(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      'wood');

  cursors = this.input.keyboard.createCursorKeys();

  patty = this.physics.add.image(100, 100, 'girl');
  patty.displayWidth = 40;
  patty.displayHeight = 60;
  patty.setCollideWorldBounds(true);

  blockList = new BlockList(this);
  blockList
      .addBlock(200, 200, 50, 50)
      .addBlock(200, 300, 50, 50)
      .addBlock(300, 200, 50, 50)
      .addBlock(300, 300, 50, 50)
      .addBlock(400, 400, 50, 50)
      .addBlock(400, 450, 50, 50)
      .addBlock(450, 400, 50, 50)
      .addBlock(450, 450, 50, 50);

  this.cameras.main.startFollow(patty);
}

function updateFn() {
  blockList.touchFrom(patty, cursors);

  if (cursors.left.isDown) {
    patty.setVelocityX(-MOVE_SPEED);
  } else if (cursors.right.isDown) {
    patty.setVelocityX(MOVE_SPEED);
  } else {
    patty.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    patty.setVelocityY(-MOVE_SPEED);
  } else if (cursors.down.isDown) {
    patty.setVelocityY(MOVE_SPEED);
  } else {
    patty.setVelocityY(0);
  }
}
