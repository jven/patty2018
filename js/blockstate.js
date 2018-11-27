/** The time needed for Patty to touch a block before it moves. */
const BLOCK_HYSTERESIS = 20;
/** The time it takes for the block to move. */
const BLOCK_MOVE_DURATION = 200;
/**
 * The amount of allowance to given when deciding whether Patty is intersecting
 * a block.
 */
const COLLISION_ALLOWANCE = 10;

class BlockState {
  constructor(scene, sprite) {
    this.scene_ = scene;
    this.sprite_ = sprite;
    this.force_ = 0;
  }

  getSprite() {
    return this.sprite_;
  }

  touchBy(cursors) {
    this.force_++;
    if (this.force_ >= BLOCK_HYSTERESIS) {
      this.moveAwayFrom_(cursors);
      this.force_ = 0;
    }
  }

  notTouching() {
    this.force_ = 0;
  }

  moveAwayFrom_(cursors) {
    var direction = this.directionFromCursors_(cursors);
    const dx = direction[0];
    const dy = direction[1];
    if (dx * dy != 0 || Math.abs(dx) + Math.abs(dy) != 1) {
      // User is holding down more than one key, can't determine direction.
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
      return [-1, 0];
    }
    if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      return [1, 0];
    }
    if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      return [0, -1];
    }
    if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      return [0, 1];
    }
    return null;
  }
}