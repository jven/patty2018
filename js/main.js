const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

const WALK_SPEED = 2;

var sprite;
var upKey;
var downKey;
var leftKey;
var rightKey;

function preloadFn() {
  this.load.image('girl', 'img/girl.png');
}

function createFn() {
  const girl = this.physics.add.image(400, 100, 'girl');
  girl.displayWidth = 50;
  girl.displayHeight = 70;
  girl.setVelocity(100, 200);
  girl.setBounce(1, 1);
  girl.setCollideWorldBounds(true);

}

function updateFn() {}
