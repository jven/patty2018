class GridRunner {
  /** Pass -1 to stamina to not render it. */
  constructor(
      scene,
      grid,
      directorState,
      sprite,
      runAnimation,
      moveDuration,
      maxStamina) {
    this.scene_ = scene;
    this.grid_ = grid;
    this.sprite_ = sprite;
    this.directorState_ = directorState;
    this.runAnimation_ = runAnimation;
    this.moveDuration_ = moveDuration;
    this.maxStamina_ = maxStamina;

    this.staminaText_ = scene.add.text(0, 0, '');
    this.staminaText_.setColor('yellow');
    this.staminaText_.setFontSize(25);
    this.staminaText_.setStroke('black', 3);
    this.staminaText_.setStyle({'font-weight': 'bold'});

    this.runState_ = null;
    this.pathMarkers_ = [];

    this.hide();
  }

  hide() {
    this.staminaText_.visible = false;
    this.scene_.tweens.killTweensOf(this.sprite_);
    this.runState_ = null;
    this.sprite_.visible = false;

    this.pathMarkers_.forEach(pathMarker => {
      this.scene_.tweens.killTweensOf(pathMarker);
      pathMarker.destroy();
    });
    this.pathMarkers_ = [];
  }

  run(path) {
    if (this.runState_) {
      console.error('Already running!');
      return;
    }

    const newRunState = {
      path: path,
      index: 0,
      stamina: this.maxStamina_,
      resolveFn: null
    };
    const runPromise = new Promise(function(resolve, reject) {
      newRunState.resolveFn = resolve;
    });
    this.runState_ = newRunState;

    const center = this.grid_.getTileCenter(path[0].tile.x, path[0].tile.y);
    this.sprite_.x = center.x - Config.GRID_TILE_SIZE_PX;
    this.sprite_.y = center.y;
    this.sprite_.visible = true;
    this.sprite_.anims.play(this.runAnimation_);

    this.addNextTween_();
    
    return runPromise;
  }

  update() {
    this.scene_.tweens.getTweensOf(this.sprite_)
        .forEach(t => t.setTimeScale(this.directorState_.getRunnerTimeScale()));

    if (!this.runState_) {
      return;
    }

    const path = this.runState_.path;
    const currIdx = this.runState_.index;
    if (currIdx >= path.length) {
      // Finished running!
      this.runState_.resolveFn(true /* finished */);
      this.hide();
      return;
    }

    if (this.runState_.stamina >= 0) {
      this.staminaText_.visible = true;
      this.staminaText_.x = this.sprite_.x;
      this.staminaText_.y = this.sprite_.y - this.sprite_.displayHeight
          - Config.GRID_RUNNER_STAMINA_TEXT_DISTANCE;
      this.staminaText_.text = this.runState_.stamina;
    } else {
      this.staminaText_.visible = false;
    }

    const currentTile = path[currIdx].tile;
    const currentCenter = this.grid_.getTileCenter(
        currentTile.x, currentTile.y);
    if (this.sprite_.x == currentCenter.x
        && this.sprite_.y == currentCenter.y) {
      this.addPathMarker_(currentTile);
      if (currIdx < path.length - 1
          && path[currIdx].targetCount == path[currIdx + 1].targetCount) {
        this.runState_.stamina--;
      }
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

  addPathMarker_(tile) {
    const center = this.grid_.getTileCenter(tile.x, tile.y);
    const pathMarker = this.scene_.add.sprite(center.x, center.y, 'pathmarker');
    pathMarker.depth = Depths.PATH_MARKER;
    this.pathMarkers_.push(pathMarker);
  }
}