class Patty {
  constructor(scene, world, cursors) {
    this.scene_ = scene;
    this.world_ = world;
    this.cursors_ = cursors;

    this.sprite_ = scene.physics.add.sprite(100, 100, 'girl');
    this.sprite_.displayWidth = Config.PATTY_SPRITE_WIDTH * Config.PATTY_SCALE;
    this.sprite_.displayHeight = Config.PATTY_SPRITE_HEIGHT * Config.PATTY_SCALE;
    this.sprite_.setCollideWorldBounds(true);

    this.standAnimation_ = 'standDown';

    this.createAnimations_();

    scene.cameras.main.startFollow(this.sprite_);
  }

  getSprite() {
    return this.sprite_;
  }

  createAnimations_() {
    this.createStandAnimation_('standUp', 1);
    this.createStandAnimation_('standRight', 18);
    this.createStandAnimation_('standDown', 35);

    this.createMoveAnimation_('moveUp', 3, 5);
    this.createMoveAnimation_('moveRight', 20, 22);
    this.createMoveAnimation_('moveDown', 37, 39);
  }

  createStandAnimation_(key, frameNumber) {
    this.scene_.anims.create({
      key: key,
      frames: [{key: 'girl', frame: frameNumber}],
      frameRate: Config.PATTY_ANIMATION_SPEED
    });
  }

  createMoveAnimation_(key, startFrameNumber, endFrameNumber) {
    this.scene_.anims.create({
      key: key,
      frames: this.scene_.anims.generateFrameNumbers('girl', {
        start: startFrameNumber,
        end: endFrameNumber
      }),
      frameRate: Config.PATTY_ANIMATION_SPEED,
      repeat: -1,
      yoyo: true
    });
  }

  update() {
    if (cursors.left.isDown) {
      this.sprite_.setVelocityX(-MOVE_SPEED);
      this.sprite_.setVelocityY(0);
      this.sprite_.flipX = true;
      this.sprite_.anims.play('moveRight', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standRight';
    } else if (cursors.right.isDown) {
      this.sprite_.setVelocityX(MOVE_SPEED);
      this.sprite_.setVelocityY(0);
      this.sprite_.flipX = false;
      this.sprite_.anims.play('moveRight', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standRight';
    } else if (cursors.up.isDown) {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(-MOVE_SPEED);
      this.sprite_.anims.play('moveUp', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standUp';
    } else if (cursors.down.isDown) {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(MOVE_SPEED);
      this.sprite_.anims.play('moveDown', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standDown';
    } else {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(0);
      this.sprite_.anims.play(this.standAnimation_);
    }
  }
}