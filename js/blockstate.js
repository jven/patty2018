class BlockState {
  constructor(
      scene,
      world,
      grid,
      directorState,
      centerX,
      centerY,
      width,
      height,
      spriteKey) {
    const sprite = scene.physics.add.image(
        centerX, centerY, spriteKey).setImmovable();
    sprite.displayWidth = width;
    sprite.displayHeight = height;
    sprite.depth = Depths.BLOCKS;
    sprite.setCollideWorldBounds(true);

    this.scene_ = scene;
    this.world_ = world;
    this.grid_ = grid;
    this.directorState_ = directorState;
    this.sprite_ = sprite;
    this.force_ = 0;
    this.forceDirection_ = null;
  }

  getIndex() {
    return this.index_;
  }

  getSprite() {
    return this.sprite_;
  }

  touchFrom(cursors) {
    const direction = this.directionFromCursors_(cursors);
    if (!direction) {
      // More than one key is being pressed, ignore touch.
      this.force_ = 0;
      return;
    }

    if (!this.forceDirection_
        || this.forceDirection_.label != direction.label) {
      // The user changed direction, ignore touch.
      this.force_ = 0;
      this.forceDirection_ = direction;
      return;
    }

    this.force_++;
    if (this.force_ >= Config.BLOCK_HYSTERESIS) {
      this.moveAwayFrom_();
      this.force_ = 0;
    }
  }

  notTouching() {
    this.force_ = 0;
  }

  moveAwayFrom_() {
    if (!this.forceDirection_) {
      console.error('Unexpected state.');
      return;
    }

    const dx = this.forceDirection_.dx;
    const dy = this.forceDirection_.dy;
    if (dx * dy != 0 || Math.abs(dx) + Math.abs(dy) != 1) {
      console.error('Unexpected state.');
      return;
    }

    const newCenterX = this.sprite_.x + dx * this.sprite_.displayWidth;
    const newCenterY = this.sprite_.y + dy * this.sprite_.displayHeight;
    if (!this.shouldMoveTo_(
        newCenterX,
        newCenterY,
        this.sprite_.displayWidth - Config.BLOCK_MOVE_OBSTACLE_ALLOWANCE,
        this.sprite_.displayHeight - Config.BLOCK_MOVE_OBSTACLE_ALLOWANCE)) {
      // Abort the move.
      return;
    }

    const tween = {
      targets: this.sprite_,
      duration: Config.BLOCK_MOVE_DURATION
    };
    if (dx != 0) {
      tween.x = this.sprite_.x + dx * this.sprite_.displayWidth;
    }
    if (dy != 0) {
      tween.y = this.sprite_.y + dy * this.sprite_.displayHeight;
    }
    this.scene_.tweens.add(tween);
  }

  directionFromCursors_(cursors) {
    if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      return {label: 'left', dx: -1, dy: 0};
    }
    if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      return {label: 'right', dx: 1, dy: 0};
    }
    if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      return {label: 'up', dx: 0, dy: -1};
    }
    if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      return {label: 'down', dx: 0, dy: 1};
    }
    return null;
  }

  shouldMoveTo_(newCenterX, newCenterY, width, height) {
    if (this.directorState_.isProductionRunning()) {
      // The production is running, don't move.
      return false;
    }

    if (!this.grid_.isInGrid(newCenterX, newCenterY)) {
      // The given location is outside of the grid, don't move.
      return false;
    }

    if (this.world_.anyObstacleInRegion(
        newCenterX,
        newCenterY,
        this.sprite_.displayWidth - Config.BLOCK_MOVE_OBSTACLE_ALLOWANCE,
        this.sprite_.displayHeight - Config.BLOCK_MOVE_OBSTACLE_ALLOWANCE)) {
      // There's something in the way, don't move.
      return false;
    }

    return true;
  }
}