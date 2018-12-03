class GridRunner {
  constructor(scene, grid, directorState, sprite, runAnimation, moveDuration) {
    this.scene_ = scene;
    this.grid_ = grid;
    this.sprite_ = sprite;
    this.directorState_ = directorState;
    this.runAnimation_ = runAnimation;
    this.moveDuration_ = moveDuration;

    this.hide();
  }

  hide() {
    this.scene_.tweens.killTweensOf(this.sprite_);
    this.runState_ = null;
    this.sprite_.visible = false;
  }

  run(path) {
    this.runState_ = {
      path: path,
      index: 0
    };

    const center = this.grid_.getTileCenter(path[0].tile.x, path[0].tile.y);
    this.sprite_.x = center.x - Config.GRID_TILE_SIZE_PX;
    this.sprite_.y = center.y;
    this.sprite_.visible = true;
    this.sprite_.anims.play(this.runAnimation_);

    this.addNextTween_();
  }

  update() {
    this.scene_.tweens.getTweensOf(this.sprite_)
        .forEach(t => t.setTimeScale(this.directorState_.getRunnerTimeScale()));

    if (!this.runState_) {
      return;
    }

    if (this.runState_.index >= this.runState_.path.length) {
      this.hide();
      this.runState_ = null;
      return;
    }

    const currentTile = this.runState_.path[this.runState_.index].tile;
    const currentCenter = this.grid_.getTileCenter(
        currentTile.x, currentTile.y);
    if (this.sprite_.x == currentCenter.x
        && this.sprite_.y == currentCenter.y) {
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
      targets: this.sprite_,
      duration: this.moveDuration_,
      x: nextCenter.x,
      y: nextCenter.y
    });
    if (nextCenter.x > this.sprite_.x) {
      this.sprite_.flipX = false;
    } else if (nextCenter.x < this.sprite_.x) {
      this.sprite_.flipX = true;
    }
  }
}