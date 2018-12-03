class DirectorState {
  constructor(directorKeys) {
    this.directorKeys_ = directorKeys;
    this.isProductionRunning_ = false;
  }

  setIsProductionRunning(isProductionRunning) {
    this.isProductionRunning_ = isProductionRunning;
  }

  isProductionRunning() {
    return this.isProductionRunning_;
  }

  getRunnerTimeScale() {
    return this.directorKeys_.space.isDown
        ? Config.GRID_RUNNER_FAST_MULTIPLIER
        : 1;
  }
}