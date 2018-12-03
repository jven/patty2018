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
var cursorKeys;
var directorKeys;
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
  
  this.load.image('wood', 'img/wood.png');

  this.load.image('walltop', 'img/walltop.png');
  this.load.image('walltopright', 'img/walltopright.png');
  this.load.image('wallright', 'img/wallright.png');

  this.load.image('rugtopleft', 'img/rugtopleft.png');
  this.load.image('rugleft', 'img/rugleft.png');
  this.load.image('rugtop', 'img/rugtop.png');
  this.load.image('rugmiddle', 'img/rugmiddle.png');

  this.load.image('crate', 'img/crate.png');
  this.load.image('piano', 'img/piano.png');
  this.load.image('target', 'img/target.png');
}

function createFn() {
  cursorKeys = this.input.keyboard.createCursorKeys();
  directorKeys = this.input.keyboard.addKeys('N');

  const directorState = new DirectorState();
  world = new World(this);
  grid = new Grid(this);

  const tileStarts = [];
  const tileEnds = [];
  for (var tileY = 0; tileY < Config.GRID_HEIGHT_IN_TILES; tileY++) {
    tileStarts.push({x: 0, y: tileY});
    tileEnds.push({x: Config.GRID_WIDTH_IN_TILES - 1, y: tileY});
  }
  const tileTarget = {x: 6, y: 1};
  pathery = new Pathery(this, world, grid, tileStarts, tileEnds, tileTarget);

  blockList = new BlockList(this, world, grid, directorState);
  blockList
      .addBlockInGrid(8, 0, 'crate')
      .addBlockInGrid(7, 1, 'crate')
      .addBlockInGrid(6, 2, 'crate')
      .addBlockInGrid(5, 1, 'crate')
      .addBlockInGrid(4, 2, 'crate')
      .addBlockInGrid(3, 3, 'crate')
      .addBlockInGrid(2, 4, 'crate')
      .addBlockInGrid(1, 5, 'crate');

  santa = new Santa(this, world, grid, directorState);
  director = new Director(this, grid, pathery, santa, directorState);
  this.input.keyboard.on('keydown', function(e) {
    if (e.keyCode == Config.DIRECTOR_PRODUCTION_RUNNING_KEY_CODE) {
      director.toggleProductionRunning();
    }
  });

  patty = new Patty(this, world, cursorKeys);
  const pattyStart = grid.getTileCenter(8, 4);
  patty.teleportTo(pattyStart.x, pattyStart.y);
}

function updateFn() {
  blockList.update(patty.getSprite(), cursorKeys);

  // Patty must move after checking for collisions to allow other sprites to
  // check for overlaps on the next update.
  world.checkCollisions(patty.getSprite());

  patty.update();

  santa.update();
}
