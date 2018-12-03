class DirectorState {
  constructor() {
    this.isProductionRunning_ = false;
  }

  setIsProductionRunning(isProductionRunning) {
    this.isProductionRunning_ = isProductionRunning;
  }

  isProductionRunning() {
    return this.isProductionRunning_;
  }
}