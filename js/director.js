class Director {
  constructor(scene, grid, pathery, santa, grinch, directorState, startY) {
    this.scene_ = scene;
    this.grid_ = grid;
    this.pathery_ = pathery;
    this.santa_ = santa;
    this.grinch_ = grinch;
    this.directorState_ = directorState;
    this.startY_ = startY;
  }

  toggleProductionRunning() {
    if (this.directorState_.isProductionRunning()) {
      this.endProduction_();
      return;
    }

    this.startProduction_();
  }

  startProduction_() {
    const path = this.pathery_.solve();
    if (!path) {
      const santaCenter = this.grid_.getTileCenter(0, this.startY_);
      this.santa_.dieAt(santaCenter.x, santaCenter.y);
      return;
    }

    this.directorState_.setIsProductionRunning(true);
    this.santa_.run(path).then(santaFinished => {
      if (santaFinished) {
        this.grinch_.run(path).then(grinchFinished => {
          this.endProduction_();
        });
      }
    });
  }

  endProduction_() {
    this.directorState_.setIsProductionRunning(false);

    this.santa_.hide();
    this.grinch_.hide();
  }
}