class Pathery {
  constructor(scene, world, grid, tileStarts, tileEnds, tileTarget) {
    this.scene_ = scene;
    this.world_ = world;
    this.grid_ = grid;
    this.tileStarts_ = tileStarts;
    this.tileEnds_ = tileEnds;
    this.tileTarget_ = tileTarget;
    
    this.lastSolveTime_ = 0;
    this.pathGraphics_ = null;
  }

  update() {
    this.lastSolveTime_++;
    if (this.lastSolveTime_ >= Config.PATHERY_SOLVE_PERIOD) {
      if (this.pathGraphics_) {
        this.pathGraphics_.destroy();
      }
      const path = this.solve_();
      if (!path) {
        this.pathGraphics_ = null;
        return;
      }
      this.pathGraphics_ = this.scene_.add.graphics();
      path.forEach(result => {
        const color = result.targetCount == 0 ? 0xF777FF : 0;
        this.pathGraphics_.fillStyle(color, 0.5);
        const center = this.grid_.getTileCenter(result.tile.x, result.tile.y);
        this.pathGraphics_.fillRect(
            center.x - Config.GRID_TILE_SIZE_PX / 2,
            center.y - Config.GRID_TILE_SIZE_PX / 2,
            Config.GRID_TILE_SIZE_PX,
            Config.GRID_TILE_SIZE_PX);
      });

      this.lastSolveTime_ = 0;
    }
  }

  solve_() {
    const results = {};
    const frontier = [];

    // Mark obstacles as visited.
    for (var tileX = 0; tileX < Config.GRID_WIDTH_IN_TILES; tileX++) {
      for (var tileY = 0; tileY < Config.GRID_HEIGHT_IN_TILES; tileY++) {
        const center = this.grid_.getTileCenter(tileX, tileY);
        if (this.world_.anyObstacleInRegion(
            center.x,
            center.y,
            Config.PATHERY_COLLISION_DETECTION_SIZE,
            Config.PATHERY_COLLISION_DETECTION_SIZE)) {
          const tile = {x: tileX, y: tileY};
          results[this.tileKey_(tile, 0 /* targetCount */)] = {
            tile: tile,
            targetCount: 0,
            distance: 99999,
            parentResult: null
          };
          results[this.tileKey_(tile, 1 /* targetCount */)] = {
            tile: tile,
            targetCount: 1,
            distance: 99999,
            parentResult: null
          };
        }
      }
    }

    // Initially visit the end tiles.
    this.tileEnds_.forEach(tileEnd => {
      this.visit_(
          results,
          frontier,
          tileEnd,
          1 /* targetCount */,
          null /* parentResult */);
    });

    // Perform the breadth-first search for the start tiles.
    while (frontier.length) {
      const tileKey = frontier.splice(0, 1)[0];
      const result = results[tileKey];
      if (tileKey == this.tileKey_(this.tileTarget_, 1)) {
        // If on the target with target count 1, visit the target again with
        // count 0.
        this.visit_(
            results, frontier, result.tile, 0 /* targetCount */, result);
      }
      [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(d => {
        this.visit_(
            results,
            frontier,
            {x: result.tile.x + d[0], y: result.tile.y + d[1]},
            result.targetCount,
            result);
      });
    }

    // Find the start tile with minimal distance.
    var bestTileStart = null;
    var bestDistance = 99999;
    this.tileStarts_.forEach(tileStart => {
      const tileKey = this.tileKey_(tileStart, 0 /* targetCount */);
      const result = results[tileKey];
      if (result && result.distance < bestDistance) {
        bestTileStart = tileStart;
        bestDistance = result.distance;
      }
    });

    // Return the best path if there is one.
    return bestTileStart ? this.constructPath_(results, bestTileStart) : null;
  }

  visit_(results, frontier, tile, targetCount, parentResult) {
    if (tile.x < 0
        || tile.x >= Config.GRID_WIDTH_IN_TILES
        || tile.y < 0
        || tile.y >= Config.GRID_HEIGHT_IN_TILES) {
      // Out of bounds.
      return;
    }

    const tileKey = this.tileKey_(tile, targetCount);
    if (results[tileKey]) {
      // Already visited.
      return;
    }

    const result = {
      tile: tile,
      targetCount: targetCount,
      distance: parentResult ? parentResult.distance + 1 : 0,
      parentResult: parentResult
    };
    results[tileKey] = result;
    frontier.push(tileKey);
  }

  constructPath_(results, tile) {
    const tileKey = this.tileKey_(tile, 0);
    var currentResult = results[tileKey];
    if (!currentResult) {
      console.error('No result for tile key.');
      return null;
    }
    const path = [];
    while (currentResult != null) {
      path.push({
        tile: currentResult.tile,
        targetCount: currentResult.targetCount
      });
      currentResult = currentResult.parentResult;
    }
    return path;
  }

  tileKey_(tile, targetCount) {
    return tile.x + ',' + tile.y + ',' + targetCount;
  }
}