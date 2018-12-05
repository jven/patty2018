class Director {
  constructor(
      scene,
      grid,
      pathery,
      santa,
      grinch,
      gift,
      directorState) {
    this.scene_ = scene;
    this.grid_ = grid;
    this.pathery_ = pathery;
    this.santa_ = santa;
    this.grinch_ = grinch;
    this.gift_ = gift;
    this.directorState_ = directorState;
  }

  reset() {
    this.directorState_.setIsProductionRunning(false);
  }

  toggleProductionRunning() {
    if (this.directorState_.isVictorious()) {
      // Disable toggling the production if we're victorious.
      return;
    }

    if (this.directorState_.isProductionRunning()) {
      this.endProduction_();
      return;
    }

    this.startProduction_();
  }

  startProduction_() {
    const path = this.pathery_.solve();
    if (!path) {
      const startTile = this.grid_.getStartTiles()[0];
      const santaCenter = this.grid_.getTileCenter(startTile.x, startTile.y);
      this.santa_.dieAt(santaCenter.x, santaCenter.y);
      return;
    }

    this.directorState_.setIsProductionRunning(true);
    const santaRun = this.santa_.run(path);
    santaRun.targetPromise.then(() => {
      this.gift_.moveToTarget();
    });
    santaRun.finishPromise.then(() => {
      const grinchRun = this.grinch_.run(path);
      grinchRun.targetPromise.then(() =>
          this.gift_.follow(this.grinch_.getRunSprite()));
      grinchRun.finishPromise.then(() => this.endProduction_());
      grinchRun.faintPromise.then(() => this.markVictorious_());
    });
    this.gift_.follow(this.santa_.getRunSprite());
  }

  endProduction_() {
    this.directorState_.setIsProductionRunning(false);

    this.santa_.hide();
    this.grinch_.hide();
    this.gift_.hide();
  }

  markVictorious_() {
    this.directorState_.markVictorious();

    this.grinch_.faint();
    this.gift_.moveToVictory();
  }
}