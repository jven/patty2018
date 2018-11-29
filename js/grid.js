class Grid {
  constructor(scene) {
    this.scene_ = scene;

    this.renderRug_();
  }

  renderRug_() {
    // Render the corners.
    this.renderRugSprite_(0, 0, 'rugtopleft');
    this.renderRugSprite_(
        Config.GRID_WIDTH_IN_TILES - 1, 0, 'rugtopleft').flipX = -1;
    this.renderRugSprite_(
        0, Config.GRID_HEIGHT_IN_TILES - 1, 'rugtopleft').flipY = -1;
    const bottomRight = this.renderRugSprite_(
        Config.GRID_WIDTH_IN_TILES - 1,
        Config.GRID_HEIGHT_IN_TILES - 1,
        'rugtopleft');
    bottomRight.flipX = -1;
    bottomRight.flipY = -1;

    // Render the sides.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      this.renderRugSprite_(tileX, 0, 'rugtop');
      this.renderRugSprite_(
          tileX, Config.GRID_HEIGHT_IN_TILES - 1, 'rugtop').flipY = -1;
    }
    for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
      this.renderRugSprite_(0, tileY, 'rugleft');
      this.renderRugSprite_(
          Config.GRID_WIDTH_IN_TILES - 1, tileY, 'rugleft').flipX = -1;
    }

    // Render the middle.
    for (var tileX = 1; tileX < Config.GRID_WIDTH_IN_TILES - 1; tileX++) {
      for (var tileY = 1; tileY < Config.GRID_HEIGHT_IN_TILES - 1; tileY++) {
        this.renderRugSprite_(tileX, tileY, 'rugmiddle');
      }
    }
  }

  renderRugSprite_(tileX, tileY, key) {
    const center = this.getTileCenter(tileX, tileY);
    return this.scene_.add.sprite(center.x, center.y, key);
  }

  getTileCenter(tileX, tileY) {
    if (tileX < 0 || tileX >= Config.GRID_WIDTH_IN_TILES
        || tileY < 0 || tileY >= Config.GRID_HEIGHT_IN_TILES) {
      console.error('Invalid tileX, tileY: ' + tileX + ', ' + tileY);
      return null;
    }

    return {
      x: Config.GRID_TOP_LEFT_X + Config.GRID_TILE_SIZE_PX * (tileX + 0.5),
      y: Config.GRID_TOP_LEFT_Y + Config.GRID_TILE_SIZE_PX * (tileY + 0.5)
    };
  }
}