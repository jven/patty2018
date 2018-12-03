class Director {
  constructor(scene, pathery, santa, directorState) {
    this.scene_ = scene;
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
    console.log('start!');
    this.directorState_.setIsProductionRunning(true);
  }

  endProduction_() {
    console.log('end!');
    this.directorState_.setIsProductionRunning(false);
  }
}