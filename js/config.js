const Config = {
  /** The camera dimensions. */
  CAMERA_WIDTH_PX: 800,
  CAMERA_HEIGHT_PX: 600,

  /** The dimensions of the world. */
  WORLD_WIDTH_PX: 700,
  WORLD_HEIGHT_PX: 800,
  WORLD_WALL_TOP_HEIGHT_PX: 96,
  WORLD_WALL_SIDE_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_HEIGHT_PX: 64,

  /** The coordinates of the top-left corner of the grid. */
  GRID_TOP_LEFT_X: 100,
  GRID_TOP_LEFT_Y: 200,
  /** The size of the tiles in the grid, in pixels. */
  GRID_TILE_SIZE_PX: 50,
  /** The width of the grid, in number of tiles. */
  GRID_WIDTH_IN_TILES: 11,
  /** The height of the grid, in number of tiles. */
  GRID_HEIGHT_IN_TILES: 7,

  /** The time needed for Patty to touch a block before it moves. */
  BLOCK_HYSTERESIS: 20,
  /** The time it takes for the block to move. */
  BLOCK_MOVE_DURATION: 200,
  /**
   * The amount of allowance to give when checking for obstacles when moving
   * blocks.
   */
  BLOCK_MOVE_OBSTACLE_ALLOWANCE: 10,

  /** The number of frames per second to animate Patty when moving. */
  PATTY_ANIMATION_SPEED: 10,
  /** How fast Patty moves. */
  PATTY_MOVE_SPEED: 200,
  /** The width of each frame in the Patty sprite sheet. */
  PATTY_SPRITE_WIDTH: 24,
  /** The height of each frame in the Patty sprite sheet. */
  PATTY_SPRITE_HEIGHT: 32,
  /** Patty's size as a multiple of the sprite dimensions above. */
  PATTY_SCALE: 1.25,

  /** The square size to use when detecting collisions when solving Pathery. */
  PATHERY_COLLISION_DETECTION_SIZE: 10,
  /**
   * The period with which to solve Pathery. A lower period solves Pathery more
   * often.
   */
  PATHERY_SOLVE_PERIOD: 5
};