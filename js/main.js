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
var blockList;
var cursors;
var patty;
var world;

function preloadFn() {
  this.load.image('gift', 'img/gift.png');
  this.load.spritesheet('girl', 'img/fumiko.png', {
    frameWidth: PATTY_SPRITE_WIDTH,
    frameHeight: PATTY_SPRITE_HEIGHT
  });
  this.load.image('wood', 'img/wood.png');
  this.load.image('rugtopleft', 'img/rugtopleft.png');
  this.load.image('rugleft', 'img/rugleft.png');
  this.load.image('rugtop', 'img/rugtop.png');
  this.load.image('rugmiddle', 'img/rugmiddle.png');
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

  world = new World(this);
  grid = new Grid(this);

  blockList = new BlockList(this, world, grid);
  blockList
      .addBlockInGrid(1, 1, 'gift')
      .addBlockInGrid(3, 1, 'gift')
      .addBlockInGrid(1, 3, 'gift')
      .addBlockInGrid(3, 3, 'gift')
      .addBlockInGrid(5, 5, 'gift')
      .addBlockInGrid(6, 5, 'gift')
      .addBlockInGrid(6, 6, 'gift')
      .addBlockInGrid(7, 6, 'gift');

  patty = new Patty(this, world, cursors);
  const pattyStart = grid.getTileCenter(8, 4);
  patty.teleportTo(pattyStart.x, pattyStart.y);
}

function updateFn() {
  blockList.update(patty.getSprite(), cursors);

  // Patty must move after checking for collisions to allow other sprites to
  // check for overlaps on the next update.
  world.checkCollisions(patty.getSprite());

  patty.update();
}
