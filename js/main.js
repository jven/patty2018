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
var blockStates = [];

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

  patty = this.physics.add.image(200, 300, 'girl');
  patty.displayWidth = 50;
  patty.displayHeight = 70;
  patty.setCollideWorldBounds(true);

  const newBlockSprite = this.physics.add.image(100, 200, 'gift').setImmovable();
  newBlockSprite.displayWidth = 50;
  newBlockSprite.displayHeight = 50;
  newBlockSprite.setCollideWorldBounds(true);
  // TODO(jven): Construct sprite inside.
  blockStates.push(new BlockState(this, newBlockSprite));

  this.cameras.main.startFollow(patty);
}

function updateFn() {
  blockStates.forEach(blockState => {
    var touchingBlock = false;
    this.physics.world.collide(patty, blockState.getSprite(), () => {
      touchingBlock = true;
    });
    if (touchingBlock) {
      blockState.touchBy(cursors);
    } else {
      blockState.notTouching();
    }
  });

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
