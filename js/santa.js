class Santa {
  constructor(scene, world, grid, directorState) {
    this.scene_ = scene;
    this.world_ = world;
    this.grid_ = grid;
    this.directorState_ = directorState;

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
    });

    this.runState_ = null;
  }

  hide() {
    this.runState_ = null;
    this.runSprite_.visible = false;
    this.deadSprite_.visible = false;
  }

  dieAt(x, y) {
    this.runState_ = null;
    this.runSprite_.visible = false;
    this.deadSprite_.visible = true;
    this.deadSprite_.x = x;
    this.deadSprite_.y = y;
    this.deadSprite_.anims.play('santaDead');
  }

  runPath(path) {
    this.deadSprite_.visible = false;
    this.runSprite_.visible = true;
    this.runState_ = {
      path: path,
      index: 0
    };
    
    const center = this.grid_.getTileCenter(path[0].tile.x, path[0].tile.y);
    this.runSprite_.x = center.x - Config.GRID_TILE_SIZE_PX;
    this.runSprite_.y = center.y;
    this.runSprite_.visible = true;
    this.runSprite_.anims.play('santaRunRight');
    
    this.addNextTween_();
  }

  update() {
    if (!this.runState_) {
      return;
    }

    if (this.runState_.index >= this.runState_.path.length) {
      this.hide();
      this.runState_ = null;
      this.directorState_.setIsProductionRunning(false);
      return;
    }

    const currentTile = this.runState_.path[this.runState_.index].tile;
    const currentCenter = this.grid_.getTileCenter(
        currentTile.x, currentTile.y);
    if (this.runSprite_.x == currentCenter.x
        && this.runSprite_.y == currentCenter.y) {
      this.runState_.index++;
      this.addNextTween_();
    }
  }

  addNextTween_() {
    if (this.runState_.index >= this.runState_.path.length) {
      return;
    }

    const nextTile = this.runState_.path[this.runState_.index].tile;
    const nextCenter = this.grid_.getTileCenter(nextTile.x, nextTile.y);
    this.scene_.tweens.add({
      targets: this.runSprite_,
      duration: Config.SANTA_MOVE_DURATION,
      x: nextCenter.x,
      y: nextCenter.y
    });
    if (nextCenter.x > this.runSprite_.x) {
      this.runSprite_.flipX = false;
    } else if (nextCenter.x < this.runSprite_.x) {
      this.runSprite_.flipX = true;
    }
  }
}