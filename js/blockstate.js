/** The time needed for Patty to touch a block before it moves. */
const BLOCK_HYSTERESIS = 20;
/** The time it takes for the block to move. */
const BLOCK_MOVE_DURATION = 200;

class BlockState {
  constructor(scene, sprite) {
    this.scene_ = scene;
    this.sprite_ = sprite;
    this.force_ = 0;
  }

  getSprite() {
    return this.sprite_;
  }

  touchBy(pattySprite) {
    this.force_++;
    if (this.force_ >= BLOCK_HYSTERESIS) {
      this.moveAwayFrom_(pattySprite);
      this.force_ = 0;
    }
  }

  notTouching() {
    this.force_ = 0;
  }

  moveAwayFrom_(pattySprite) {
    this.scene_.tweens.add({
      targets: this.sprite_,
      x: this.sprite_.x + this.sprite_.displayWidth,
      duration: BLOCK_MOVE_DURATION
    });
  }
}