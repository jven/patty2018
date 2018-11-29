const CAMERA_WIDTH = 800;
const CAMERA_HEIGHT = 600;
const WORLD_WIDTH = 700;
const WORLD_HEIGHT = 800;
const MOVE_SPEED = 200;

const PATTY_SPRITE_WIDTH = 24;
const PATTY_SPRITE_HEIGHT = 32;
const PATTY_SCALE = 1.5;

const ANIMATION_FRAME_RATE = 10;

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
  this.load.spritesheet('girl', 'img/fumiko.png', {
    frameWidth: PATTY_SPRITE_WIDTH,
    frameHeight: PATTY_SPRITE_HEIGHT
  });
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

  patty = new Patty(this /* scene */, cursors);
  blockList.addCollidingSpritesTo(patty);
}

function updateFn() {
  blockList.update(patty.getSprite(), cursors);

  // Patty must move after checking for collisions to allow other sprites to
  // check for overlaps on the next update.
  patty.checkForCollisions();

  patty.update();
}
