const Config = {
  /** The camera dimensions. */
  CAMERA_WIDTH_PX: 800,
  CAMERA_HEIGHT_PX: 600,

  /** The key code to toggle whether the production is running. */
  DIRECTOR_PRODUCTION_RUNNING_KEY_CODE: 78, // N

  /** The dimensions of the world. */
  WORLD_WIDTH_PX: 630,
  WORLD_HEIGHT_PX: 700,
  WORLD_WALL_TOP_HEIGHT_PX: 96,
  WORLD_WALL_SIDE_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_HEIGHT_PX: 64,
  WORLD_PIANO_WIDTH_PX: 36,
  WORLD_PIANO_HEIGHT_PX: 150,
  WORLD_FIREPLACE_WIDTH_PX: 64,
  WORLD_FIREPLACE_HEIGHT_PX: 175,
  WORLD_FIREPLACE_SCALE: 0.57,

  /** The coordinates of the top-left corner of the grid. */
  GRID_TOP_LEFT_X: 40,
  GRID_TOP_LEFT_Y: 300,
  /** The size of the tiles in the grid, in pixels. */
  GRID_TILE_SIZE_PX: 50,
  /** The width of the grid, in number of tiles. */
  GRID_WIDTH_IN_TILES: 11,
  /** The height of the grid, in number of tiles. */
  GRID_HEIGHT_IN_TILES: 7,

  /** The dimensions of the tree. */
  TREE_SPRITE_WIDTH: 97,
  TREE_SPRITE_HEIGHT: 140,
  TREE_SCALE: 0.7,
  TREE_ANIMATION_SPEED: 5,

  /** The dimensions of the gift. */
  GIFT_WIDTH_PX: 256,
  GIFT_HEIGHT_PX: 256,
  GIFT_SCALE: 0.1,

  /** The time needed for Patty to touch a block before it moves. */
  BLOCK_HYSTERESIS: 20,
  /** The time it takes for the block to move one tile. */
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
  /** The dimensions of each frame in the Patty sprite sheet. */
  PATTY_SPRITE_WIDTH: 24,
  PATTY_SPRITE_HEIGHT: 32,
  /** Patty's size as a multiple of the sprite dimensions above. */
  PATTY_SCALE: 1.25,

  /** The dimensions of each frame of the Santa sprites. */
  SANTA_RUN_SPRITE_WIDTH: 45,
  SANTA_RUN_SPRITE_HEIGHT: 56,
  SANTA_DEAD_SPRITE_WIDTH: 75,
  SANTA_DEAD_SPRITE_HEIGHT: 70,
  /** The number of frames per second to animate Santa when moving. */
  SANTA_ANIMATION_SPEED: 15,
  /** How long it takes Santa to run one tile. */
  SANTA_MOVE_DURATION: 300,

  /** The dimensions of each frame of the Grinch sprite. */
  GRINCH_SPRITE_WIDTH: 59,
  GRINCH_SPRITE_HEIGHT: 64,
  GRINCH_SCALE: 0.8,
  /** The number of frames per second to animate the Grinch when moving. */
  GRINCH_ANIMATION_SPEED: 20,
  /** How long it takes the Grinch to run one tile. */
  GRINCH_MOVE_DURATION: 300,

  /** How fast runners move through the grid. */
  GRID_RUNNER_FAST_MULTIPLIER: 15,
  GRID_RUNNER_PATH_MARKER_ALPHA: 0.4,
  GRID_RUNNER_PATH_MARKER_FADE_DURATION: 1000,

  /** The square size to use when detecting collisions when solving Pathery. */
  PATHERY_COLLISION_DETECTION_SIZE: 10
};