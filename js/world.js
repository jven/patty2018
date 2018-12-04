class World {
  constructor(scene) {
    this.scene_ = scene;
    this.obstacleSprites_ = [];
    this.nonBlockingObstacleSprites_ = [];

    scene.physics.world.setBounds(
        0, 0, Config.WORLD_WIDTH_PX, Config.WORLD_HEIGHT_PX);

    // Render the floor.
    const floor = scene.add.tileSprite(
        Config.WORLD_WIDTH_PX / 2,
        Config.WORLD_HEIGHT_PX / 2,
        Config.WORLD_WIDTH_PX,
        Config.WORLD_HEIGHT_PX,
        'wood');
    floor.depth = Depths.FLOOR;

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
    topWall.depth = Depths.FLOOR;

    // Top right
    const topRightWall = this.scene_.physics.add.sprite(
        Config.WORLD_WIDTH_PX - Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX / 2,
        Config.WORLD_WALL_TOP_RIGHT_HEIGHT_PX / 2,
        'walltopright');
    topRightWall.depth = Depths.FLOOR;
    topRightWall.setImmovable(true);

    // Top left
    const topLeftWall = this.scene_.physics.add.sprite(
        Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX / 2,
        Config.WORLD_WALL_TOP_RIGHT_HEIGHT_PX / 2,
        'walltopright');
    topLeftWall.depth = Depths.FLOOR;
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
    rightWall.depth = Depths.FLOOR;

    const leftWall = this.scene_.physics.add.existing(
        this.scene_.add.tileSprite(
            Config.WORLD_WALL_SIDE_WIDTH_PX / 2,
            (Config.WORLD_HEIGHT_PX + Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX) / 2,
            Config.WORLD_WALL_SIDE_WIDTH_PX,
            Config.WORLD_HEIGHT_PX - Config.WORLD_WALL_TOP_RIGHT_WIDTH_PX,
            'wallright'),
        true /* static */);
    leftWall.depth = Depths.FLOOR;
    leftWall.flipX = -1;
    
    this.addObstacleSprite(topWall);
    this.addObstacleSprite(topRightWall);
    this.addObstacleSprite(topLeftWall);
    this.addObstacleSprite(leftWall);
    this.addObstacleSprite(rightWall);
  }

  renderObjects_() {
    const pianoWidth = Config.WORLD_PIANO_WIDTH_PX * Config.WORLD_PIANO_SCALE;
    const pianoHeight = Config.WORLD_PIANO_HEIGHT_PX * Config.WORLD_PIANO_SCALE;
    const piano = this.scene_.physics.add.sprite(
        Config.WORLD_WALL_SIDE_WIDTH_PX + pianoWidth / 2,
        200,
        'piano');
    piano.displayWidth = pianoWidth;
    piano.displayHeight = pianoHeight;
    piano.depth = Depths.OBJECTS;
    piano.setImmovable(true);

    this.addObstacleSprite(piano);
  }

  addObstacleSprite(sprite) {
    this.obstacleSprites_.push(sprite);
  }

  addNonPathBlockingObstacleSprite(sprite) {
    this.nonBlockingObstacleSprites_.push(sprite);
  }

  anyPathBlockingObstacleInRegion(centerX, centerY, width, height) {
    return this.anyObstacleInRegion_(
        this.obstacleSprites_,
        centerX,
        centerY,
        width,
        height);
  }

  anyObstacleInRegion(centerX, centerY, width, height) {
    return this.anyObstacleInRegion_(
        this.obstacleSprites_.concat(this.nonBlockingObstacleSprites_),
        centerX,
        centerY,
        width,
        height);
  }

  anyObstacleInRegion_(obstacles, centerX, centerY, width, height) {
    const region = new Phaser.Geom.Rectangle(
        centerX - width / 2, centerY - height / 2, width, height);
    for (var i = 0; i < obstacles.length; i++) {
      const obstacleRect = obstacles[i].getBounds();
      const intersection = Phaser.Geom.Rectangle.Intersection(
          region, obstacleRect);
      if (intersection.width || intersection.height) {
        return true;
      }
    }

    return false;
  }

  checkCollisions(sprite) {
    this.scene_.physics.collide(
        sprite,
        this.obstacleSprites_.concat(this.nonBlockingObstacleSprites_));
  }
}
