class Grinch {
  constructor(scene, grid, directorState, maxStamina) {
    this.sprite_ = scene.physics.add.sprite(0, 0, 'grinch');
    this.sprite_.displayWidth = Config.GRINCH_SPRITE_WIDTH
        * Config.GRINCH_SCALE;
    this.sprite_.displayHeight = Config.GRINCH_SPRITE_HEIGHT
        * Config.GRINCH_SCALE;
    this.sprite_.depth = Depths.GRINCH;
    this.sprite_.setImmovable(true);
    this.sprite_.visible = false;

    scene.anims.create({
      key: 'grinchRunRight',
      frames: scene.anims.generateFrameNumbers('grinch', {
        start: 0,
        end: 14
      }),
      frameRate: Config.GRINCH_ANIMATION_SPEED,
      repeat: -1
    });

    this.gridRunner_ = new GridRunner(
        scene,
        grid,
        directorState,
        this.sprite_,
        'grinchRunRight',
        Config.GRINCH_MOVE_DURATION,
        maxStamina);
  }

  hide() {
    this.gridRunner_.hide();
  }

  run(path) {
    return this.gridRunner_.run(path);
  }

  update() {
    this.gridRunner_.update();
  }
}