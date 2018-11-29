class World {
  constructor(scene) {
    this.scene_ = scene;
    this.obstacleSprites_ = [];
  }

  addObstacleSprite(sprite) {
    this.obstacleSprites_.push(sprite);
  }

  anyObstacleInRegion(region) {
    for (var i = 0; i < this.obstacleSprites_.length; i++) {
      const obstacleRect = this.obstacleSprites_[i].getBounds();
      const intersection = Phaser.Geom.Rectangle.Intersection(
          region, obstacleRect);
      if (intersection.width || intersection.height) {
        return true;
      }
    }

    return false;
  }

  checkCollisions(sprite) {
    this.scene_.physics.collide(sprite, this.obstacleSprites_);
  }
}