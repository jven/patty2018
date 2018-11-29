const config = {
  type: Phaser.AUTO,
  width: Config.CAMERA_WIDTH_PX,
  height: Config.CAMERA_HEIGHT_PX,
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
  this.load.spritesheet('girl', 'img/fumiko.png', {
    frameWidth: Config.PATTY_SPRITE_WIDTH,
    frameHeight: Config.PATTY_SPRITE_HEIGHT
  });
  
  this.load.image('wood', 'img/wood.png');

  this.load.image('walltop', 'img/walltop.png');
  this.load.image('walltopright', 'img/walltopright.png');
  this.load.image('wallright', 'img/wallright.png');

  this.load.image('rugtopleft', 'img/rugtopleft.png');
  this.load.image('rugleft', 'img/rugleft.png');
  this.load.image('rugtop', 'img/rugtop.png');
  this.load.image('rugmiddle', 'img/rugmiddle.png');

  this.load.image('gift', 'img/gift.png');
}

function createFn() {
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
