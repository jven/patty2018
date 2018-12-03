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

  getSantaMoveSpeed() {
    return this.directorKeys_.space.isDown
        ? Config.SANTA_FAST_MOVE_DURATION
        : Config.SANTA_MOVE_DURATION;
  }
}