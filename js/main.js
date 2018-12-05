const config = {
  parent: 'game',
  type: Phaser.AUTO,
  width: window.innerWidth - 50,
  height: window.innerHeight - 50,
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
var cursorKeys;
var directorKeys;
var gift;
var grinch;
var pathery;
var patty;
var santa;
var world;

function preloadFn() {
  this.load.spritesheet('girl', 'img/fumiko.png', {
    frameWidth: Config.PATTY_SPRITE_WIDTH,
    frameHeight: Config.PATTY_SPRITE_HEIGHT
  });
  this.load.spritesheet('santarun', 'img/santarun.png', {
    frameWidth: Config.SANTA_RUN_SPRITE_WIDTH,
    frameHeight: Config.SANTA_RUN_SPRITE_HEIGHT
  });
  this.load.spritesheet('santadead', 'img/santadead.png', {
    frameWidth: Config.SANTA_DEAD_SPRITE_WIDTH,
    frameHeight: Config.SANTA_DEAD_SPRITE_HEIGHT
  });
  this.load.spritesheet('grinchrun', 'img/grinchrun.png', {
    frameWidth: Config.GRINCH_RUN_SPRITE_WIDTH,
    frameHeight: Config.GRINCH_RUN_SPRITE_HEIGHT
  });
  this.load.spritesheet('tree', 'img/tree.png', {
    frameWidth: Config.TREE_SPRITE_WIDTH,
    frameHeight: Config.TREE_SPRITE_HEIGHT
  });

  this.load.image('bench', 'img/bench.png');
  this.load.image('crate', 'img/crate.png');
  this.load.image('fireplace', 'img/fireplace.png');
  this.load.image('gift', 'img/gift.png');
  this.load.image('grinchfaint', 'img/grinchfaint.png');
  this.load.image('heart', 'img/heart.png');
  this.load.image('pathmarker', 'img/pathmarker.png');
  this.load.image('piano', 'img/piano.png');
  this.load.image('rugleft', 'img/rugleft.png');
  this.load.image('rugmiddle', 'img/rugmiddle.png');
  this.load.image('rugtop', 'img/rugtop.png');
  this.load.image('rugtopleft', 'img/rugtopleft.png');
  this.load.image('target', 'img/target.png');
  this.load.image('wallright', 'img/wallright.png');
  this.load.image('walltop', 'img/walltop.png');
  this.load.image('walltopright', 'img/walltopright.png');
  this.load.image('wood', 'img/wood.png');
}

function createFn() {
  cursorKeys = this.input.keyboard.createCursorKeys();
  directorKeys = this.input.keyboard.addKeys('space');

  const directorState = new DirectorState(directorKeys);
  world = new World(this);
  grid = new Grid(this, world);
  pathery = new Pathery(world, grid);
  blockList = new BlockList(this, world, grid, directorState);
  santa = new Santa(this, grid, directorState);
  grinch = new Grinch(this, grid, directorState);
  gift = new Gift(this, grid);
  director = new Director(
      this, grid, pathery, santa, grinch, gift, directorState);
  patty = new Patty(this, world, grid, cursorKeys);

  this.events.on('resize', (width, height) => {
    this.cameras.resize(width, height);
  }, this);
  this.input.keyboard.on('keydown', function(e) {
    if (e.keyCode == Config.DIRECTOR_PRODUCTION_RUNNING_KEY_CODE) {
      director.toggleProductionRunning();
    }
    if (e.keyCode == Config.RESET_KEY_CODE) {
      resetWithPresetPuzzle();
    }
  });

  resetWithPresetPuzzle();
}

function updateFn() {
  blockList.update(patty.getSprite(), cursorKeys);

  // Patty must move after checking for collisions to allow other sprites to
  // check for overlaps on the next update.
  world.checkCollisions(patty.getSprite());

  patty.update();

  santa.update();
  grinch.update();
  gift.update();
}

function resetWithPresetPuzzle() {
  resetPuzzle(
      4 /* startY */,
      1 /* endY */,
      6 /* targetX */,
      1 /* targetY */,
      8 /* pattyX */,
      4 /* pattyY */,
      40 /* grinchMaxStamina */);
}

function resetPuzzle(
    startY, endY, targetX, targetY, pattyX, pattyY, grinchMaxStamina) {
  world.reset();
  grid.reset(startY, endY, {x: targetX, y: targetY});
  blockList.reset();
  blockList.addBlockInGrid(8, 0, 'crate');
  blockList.addBlockInGrid(7, 1, 'crate');
  blockList.addBlockInGrid(6, 2, 'crate');
  blockList.addBlockInGrid(5, 1, 'crate');
  blockList.addBlockInGrid(4, 2, 'crate');
  blockList.addBlockInGrid(3, 3, 'crate');
  blockList.addBlockInGrid(2, 4, 'crate');
  const justin = blockList.addBlockOffGrid(0, -1, 'bench');

  santa.hide();
  grinch.reset(grinchMaxStamina);
  gift.hide();
  director.reset();
  patty.reset(pattyX, pattyY, justin);
}

window.addEventListener('resize', () => {
  game.resize(window.innerWidth - 50, window.innerHeight - 50);
});
