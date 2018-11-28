/** The time needed for Patty to touch a block before it moves. */
const BLOCK_HYSTERESIS = 20;
/** The time it takes for the block to move. */
const BLOCK_MOVE_DURATION = 200;
/**
 * The amount of allowance to give when deciding whether a block can be moved to
 * a given space.
 */
const MOVE_COLLISION_ALLOWANCE = 10;

class BlockState {
  constructor(blockList, scene, centerX, centerY, width, height) {
    const sprite = scene.physics.add.image(
        centerX, centerY, 'gift').setImmovable();
    sprite.displayWidth = width;
    sprite.displayHeight = height;
    sprite.setCollideWorldBounds(true);

    this.blockList_ = blockList;
    this.scene_ = scene;
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
    if (this.force_ >= BLOCK_HYSTERESIS) {
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

    if (this.blockList_.isBlockInRegion(
        this.sprite_.x + dx * this.sprite_.displayWidth,
        this.sprite_.y + dy * this.sprite_.displayHeight,
        this.sprite_.displayWidth - MOVE_COLLISION_ALLOWANCE,
        this.sprite_.displayHeight - MOVE_COLLISION_ALLOWANCE)) {
      // There is a block in the way.
      return;
    }

    const tween = {
      targets: this.sprite_,
      duration: BLOCK_MOVE_DURATION
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
}