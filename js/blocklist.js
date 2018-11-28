class BlockList {
  constructor(scene) {
    this.scene_ = scene;
    this.blocks_ = [];
    this.sprites_ = [];
    this.blockIndex_ = 0;
  }

  addBlock(x, y, width, height) {
    const blockState = new BlockState(this.scene_, x, y, width, height);
    this.blocks_.push(blockState);
    const sprite = blockState.getSprite();
    sprite.setData('blockIndex', this.blockIndex_++);
    this.sprites_.push(sprite);

    this.blockIndex_++;
    return this;
  }

  touchFrom(patty, cursors) {
    // Count the number of overlapping blocks and keep track of the overlapping
    // block.
    var numOverlaps = 0;
    var collidingBlockIndex = -1;
    this.sprites_.forEach(blockSprite => {
      const intersection = Phaser.Geom.Rectangle.Intersection(
          patty.getBounds(), blockSprite.getBounds());
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

    // Actually perform the separation.
    this.scene_.physics.collide(patty, this.sprites_);

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