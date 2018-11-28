const CAMERA_WIDTH = 800;
const CAMERA_HEIGHT = 600;
const WORLD_WIDTH = 700;
const WORLD_HEIGHT = 800;
const MOVE_SPEED = 200;
const ANIMATION_FRAME_RATE = 5;

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
var standAnimation = 'standDown';

function preloadFn() {
  this.load.image('gift', 'img/gift.png');
  this.load.spritesheet('girl', 'img/fumiko.png', {
    frameWidth: 24,
    frameHeight: 32
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

  patty = this.physics.add.sprite(100, 100, 'girl');
  patty.displayWidth = 48;
  patty.displayHeight = 64;
  patty.setCollideWorldBounds(true);

  this.anims.create({
    key: 'moveRight',
    frames: this.anims.generateFrameNumbers('girl', {
      start: 20,
      end: 22
    }),
    frameRate: ANIMATION_FRAME_RATE,
    repeat: -1,
    yoyo: true
  });
  this.anims.create({
    key: 'standRight',
    frames: [{key: 'girl', frame: 17}],
    frameRate: ANIMATION_FRAME_RATE
  });
  this.anims.create({
    key: 'moveDown',
    frames: this.anims.generateFrameNumbers('girl', {
      start: 37,
      end: 39
    }),
    frameRate: ANIMATION_FRAME_RATE,
    repeat: -1,
    yoyo: true
  });
  this.anims.create({
    key: 'standDown',
    frames: [{key: 'girl', frame: 35}],
    frameRate: ANIMATION_FRAME_RATE
  });
  this.anims.create({
    key: 'moveUp',
    frames: this.anims.generateFrameNumbers('girl', {
      start: 3,
      end: 5
    }),
    frameRate: ANIMATION_FRAME_RATE,
    repeat: -1,
    yoyo: true
  });
  this.anims.create({
    key: 'standUp',
    frames: [{key: 'girl', frame: 1}],
    frameRate: ANIMATION_FRAME_RATE
  });

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
    patty.setVelocityY(0);
    patty.flipX = true;
    patty.anims.play('moveRight', true /* ignoreIfPlaying */);
    standAnimation = 'standRight';
  } else if (cursors.right.isDown) {
    patty.setVelocityX(MOVE_SPEED);
    patty.setVelocityY(0);
    patty.flipX = false;
    patty.anims.play('moveRight', true /* ignoreIfPlaying */);
    standAnimation = 'standRight';
  } else if (cursors.up.isDown) {
    patty.setVelocityX(0);
    patty.setVelocityY(-MOVE_SPEED);
    patty.anims.play('moveUp', true /* ignoreIfPlaying */);
    standAnimation = 'standUp';
  } else if (cursors.down.isDown) {
    patty.setVelocityX(0);
    patty.setVelocityY(MOVE_SPEED);
    patty.anims.play('moveDown', true /* ignoreIfPlaying */);
    standAnimation = 'standDown';
  } else {
    patty.setVelocityX(0);
    patty.setVelocityY(0);
    patty.anims.play(standAnimation);
  }
}
