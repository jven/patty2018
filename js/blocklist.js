class BlockList {
  constructor(scene, world, grid, directorState) {
    this.scene_ = scene;
    this.world_ = world;
    this.grid_ = grid;
    this.directorState_ = directorState;
    this.blocks_ = [];
    this.sprites_ = [];
    this.blockIndex_ = 0;
  }

  addBlock_(centerX, centerY, width, height, spriteKey, canMoveOffGrid) {
    const blockState = new BlockState(
        this.scene_,
        this.world_,
        this.grid_,
        this.directorState_,
        centerX,
        centerY,
        width,
        height,
        spriteKey,
        canMoveOffGrid);
    this.blocks_.push(blockState);
    const sprite = blockState.getSprite();
    sprite.setData('blockIndex', this.blockIndex_++);
    this.sprites_.push(sprite);

    this.world_.addObstacleSprite(sprite);

    this.blockIndex_++;
    return this;
  }

  addBlockOffGrid(tileX, tileY, spriteKey) {
    const center = this.grid_.getTileCenterOffGrid(tileX, tileY);
    return this.addBlock_(
        center.x,
        center.y,
        Config.GRID_TILE_SIZE_PX,
        Config.GRID_TILE_SIZE_PX,
        spriteKey,
        true /* canMoveOffGrid */);
  }

  addBlockInGrid(tileX, tileY, spriteKey) {
    const center = this.grid_.getTileCenter(tileX, tileY);
    return this.addBlock_(
        center.x,
        center.y,
        Config.GRID_TILE_SIZE_PX,
        Config.GRID_TILE_SIZE_PX,
        spriteKey,
        false /* canMoveOffGrid */);
  }

  update(pattySprite, cursors) {
    // Count the number of overlapping blocks and keep track of the overlapping
    // block.
    var numOverlaps = 0;
    var collidingBlockIndex = -1;
    this.sprites_.forEach(blockSprite => {
      const intersection = Phaser.Geom.Rectangle.Intersection(
          pattySprite.getBounds(), blockSprite.getBounds());
      if (intersection.width && intersection.height) {
        numOverlaps++;
        const blockIndex = blockSprite.getData('blockIndex');
        if (typeof blockIndex != "number") {
          console.error('No block index!');
          return;
        }
        collidingBlockIndex = blockIndex;
      }
    });

    // If there is a single overlapping block, mark it as touched. Otherwise,
    // mark all other blocks as untouched.
    this.blocks_.forEach(blockState => {
      if (numOverlaps == 1
          && blockState.getSprite().getData('blockIndex')
              == collidingBlockIndex) {
        blockState.touchFrom(cursors);
      } else {
        blockState.notTouching();
      }
    });
  }
}