class World {
  constructor(scene) {
    this.scene_ = scene;
    this.obstacleSprites_ = [];

    scene.physics.world.setBounds(
        0, 0, Config.WORLD_WIDTH_PX, Config.WORLD_HEIGHT_PX);

    // Render the floor.
    scene.add.tileSprite(
        Config.WORLD_WIDTH_PX / 2,
        Config.WORLD_HEIGHT_PX / 2,
        Config.WORLD_WIDTH_PX,
        Config.WORLD_HEIGHT_PX,
        'wood');

    this.renderWalls_();
  }

  renderWalls_() {
    this.addObstacleSprite(
        this.scene_.physics.add.existing(
            this.scene_.add.tileSprite(
                Config.WORLD_WIDTH_PX / 2,
                Config.WORLD_WALL_TOP_HEIGHT_PX / 2,
                Config.WORLD_WIDTH_PX,
                Config.WORLD_WALL_TOP_HEIGHT_PX,
                'walltop'),
            true /* static */));
  }

  addObstacleSprite(sprite) {
    this.obstacleSprites_.push(sprite);
  }

  anyObstacleInRegion(centerX, centerY, width, height) {
    const region = new Phaser.Geom.Rectangle(
        centerX - width / 2, centerY - height / 2, width, height);
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
