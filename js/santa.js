class Santa {
  constructor(scene, world) {
    this.scene_ = scene;
    this.world_ = world;

    this.sprite_ = scene.physics.add.sprite(100, 100, 'santa');
    this.sprite_.displayWidth = Config.SANTA_SPRITE_WIDTH;
    this.sprite_.displayHeight = Config.SANTA_SPRITE_HEIGHT;

    scene.anims.create({
      key: 'santaRun',
      frames: scene.anims.generateFrameNumbers('santa', {
        start: 0,
        end: 9
      }),
      frameRate: Config.SANTA_ANIMATION_SPEED,
      repeat: -1
    });
  }

  teleportTo(x, y) {
    this.sprite_.x = x;
    this.sprite_.y = y;
  }

  update() {
    this.sprite_.anims.play('santaRun', true /* ignoreIfPlaying */);
  }
}