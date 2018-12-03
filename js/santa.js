class Santa {
  constructor(scene, world) {
    this.scene_ = scene;
    this.world_ = world;

    this.runSprite_ = scene.physics.add.sprite(0, 0, 'santarun');
    this.runSprite_.displayWidth = Config.SANTA_RUN_SPRITE_WIDTH;
    this.runSprite_.displayHeight = Config.SANTA_RUN_SPRITE_HEIGHT;
    this.runSprite_.setImmovable(true);
    this.runSprite_.visible = false;

    this.deadSprite_ = scene.physics.add.sprite(0, 0, 'santadead');
    this.deadSprite_.displayWidth = Config.SANTA_DEAD_SPRITE_WIDTH;
    this.deadSprite_.displayHeight = Config.SANTA_DEAD_SPRITE_HEIGHT;
    this.deadSprite_.setImmovable(true);
    this.deadSprite_.visible = false;

    scene.anims.create({
      key: 'santaRunRight',
      frames: scene.anims.generateFrameNumbers('santarun', {
        start: 0,
        end: 9
      }),
      frameRate: Config.SANTA_ANIMATION_SPEED,
      repeat: -1
    });
    scene.anims.create({
      key: 'santaDead',
      frames: scene.anims.generateFrameNumbers('santadead', {
        start: 0,
        end: 16
      }),
      frameRate: Config.SANTA_ANIMATION_SPEED
    })
  }

  hide() {
    this.runSprite_.visible = false;
    this.deadSprite_.visible = false;
  }

  dieAt(x, y) {
    this.runSprite_.visible = false;
    this.deadSprite_.visible = true;
    this.deadSprite_.x = x;
    this.deadSprite_.y = y;
    this.deadSprite_.anims.play('santaDead');
  }
}