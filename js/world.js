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

    this.renderObjects_();
  }

  renderWalls_() {
    // Top
    const topWall = this.scene_.physics.add.existing(
        this.scene_.add.tileSprite(
            Config.WORLD_WIDTH_PX / 2,
            Config.WORLD_WALL_TOP_HEIGHT_PX / 2,
            Config.WORLD_WIDTH_PX,
            Config.WORLD_WALL_TOP_HEIGHT_PX,
            'walltop'),
        true /* static */);

    // Top right
    const topRightWall = this.scene_.physics.add.sprite(
        Config.WORLD_WIDTH_PX - Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX / 2,
        Config.WORLD_WALL_TOP_RIGHT_HEIGHT_PX / 2,
        'walltopright');
    topRightWall.setImmovable(true);

    // Top left
    const topLeftWall = this.scene_.physics.add.sprite(
        Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX / 2,
        Config.WORLD_WALL_TOP_RIGHT_HEIGHT_PX / 2,
        'walltopright');
    topLeftWall.setImmovable(true);
    topLeftWall.flipX = -1;

    const rightWall = this.scene_.physics.add.existing(
        this.scene_.add.tileSprite(
            Config.WORLD_WIDTH_PX - Config.WORLD_WALL_SIDE_WIDTH_PX / 2,
            (Config.WORLD_HEIGHT_PX + Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX) / 2,
            Config.WORLD_WALL_SIDE_WIDTH_PX,
            Config.WORLD_HEIGHT_PX - Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX,
            'wallright'),
        true /* static */);

    const leftWall = this.scene_.physics.add.existing(
        this.scene_.add.tileSprite(
            Config.WORLD_WALL_SIDE_WIDTH_PX / 2,
            (Config.WORLD_HEIGHT_PX + Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX) / 2,
            Config.WORLD_WALL_SIDE_WIDTH_PX,
            Config.WORLD_HEIGHT_PX - Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX,
            'wallright'),
        true /* static */);
    leftWall.flipX = -1;
    
    this.addObstacleSprite(topWall);
    this.addObstacleSprite(topRightWall);
    this.addObstacleSprite(topLeftWall);
    this.addObstacleSprite(leftWall);
    this.addObstacleSprite(rightWall);
  }

  renderObjects_() {
    const piano = this.scene_.physics.add.sprite(
        Config.WORLD_WALL_SIDE_WIDTH_PX + Config.WORLD_PIANO_WIDTH_PX / 2,
        Config.WORLD_HEIGHT_PX - Config.WORLD_PIANO_HEIGHT_PX / 2 - 50,
        'piano');
    piano.setImmovable(true);

    this.addObstacleSprite(piano);
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
