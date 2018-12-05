const Config = {
  /** The key code to toggle whether the production is running. */
  DIRECTOR_PRODUCTION_RUNNING_KEY_CODE: 78, // N

  /** The dimensions of the world. */
  WORLD_WIDTH_PX: 640,
  WORLD_HEIGHT_PX: 615,
  WORLD_WALL_TOP_HEIGHT_PX: 96,
  WORLD_WALL_SIDE_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_WIDTH_PX: 10,
  WORLD_WALL_TOP_RIGHT_HEIGHT_PX: 64,
  WORLD_PIANO_WIDTH_PX: 352,
  WORLD_PIANO_HEIGHT_PX: 1544,
  WORLD_PIANO_SCALE: 0.1,
  WORLD_FIREPLACE_WIDTH_PX: 64,
  WORLD_FIREPLACE_HEIGHT_PX: 175,
  WORLD_FIREPLACE_SCALE: 0.57,

  /** The coordinates of the top-left corner of the grid. */
  GRID_TOP_LEFT_X: 50,
  GRID_TOP_LEFT_Y: 225,
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
  GIFT_VICTORY_SCALE: 0.2,

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
  /** How often to show hearts over Patty when near Justin. */
  PATTY_HEART_PERIOD: 6,
  /** How long it takes for the hearts to float up. */
  PATTY_HEART_FLOAT_DURATION: 500,
  /** How far the hearts should float up. */
  PATTY_HEART_FLOAT_DISTANCE: 15,
  /** How much the hearts spread from Patty's head. */
  PATTY_HEART_SPREAD: 15,
  /** The dimensions of the hearts. */
  PATTY_HEART_WIDTH_PX: 10,
  PATTY_HEART_HEIGHT_PX: 10,
  /** How close Patty needs to be to Justin to show hearts. <3 */
  PATTY_JUSTIN_HEART_PROXIMITY: 80,

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
  GRINCH_RUN_SPRITE_WIDTH: 59,
  GRINCH_RUN_SPRITE_HEIGHT: 64,
  GRINCH_RUN_SCALE: 0.8,
  GRINCH_FAINT_SPRITE_WIDTH: 31,
  GRINCH_FAINT_SPRITE_HEIGHT: 74,
  GRINCH_FAINT_SCALE: 0.8,
  /** The number of frames per second to animate the Grinch when moving. */
  GRINCH_ANIMATION_SPEED: 20,
  /** How long it takes the Grinch to run one tile. */
  GRINCH_MOVE_DURATION: 300,
  /** How long it takes the Grinch to faint. */
  GRINCH_FAINT_DURATION: 1000,
  /** How long to wait before the Grinch faints. */
  GRINCH_FAINT_DELAY: 1000,

  /** How fast runners move through the grid. */
  GRID_RUNNER_FAST_MULTIPLIER: 15,
  GRID_RUNNER_PATH_MARKER_ALPHA: 0.4,
  GRID_RUNNER_PATH_MARKER_FADE_DURATION: 1000,

  /** The square size to use when detecting collisions when solving Pathery. */
  PATHERY_COLLISION_DETECTION_SIZE: 10
};