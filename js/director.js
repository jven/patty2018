class Director {
  constructor(scene, grid, pathery, santa, directorState) {
    this.scene_ = scene;
    this.grid_ = grid;
    this.pathery_ = pathery;
    this.santa_ = santa;
    this.directorState_ = directorState;
  }

  toggleProductionRunning() {
    if (this.directorState_.isProductionRunning()) {
      this.endProduction_();
      return;
    }

    this.startProduction_();
  }

  startProduction_() {
    this.directorState_.setIsProductionRunning(true);

    const path = this.pathery_.solve();
    if (!path) {
      const santaCenter = this.grid_.getTileCenter(0, 3);
      this.santa_.dieAt(
          santaCenter.x - Config.GRID_TILE_SIZE_PX, santaCenter.y);
      return;
    }

    const santaCenter = this.grid_.getTileCenter(0, 3);
    this.santa_.dieAt(
        santaCenter.x - 20, santaCenter.y);
  }

  endProduction_() {
    this.directorState_.setIsProductionRunning(false);

    this.santa_.hide();
  }
}