class Patty {
  constructor(scene, world, justin, cursorKeys) {
    this.scene_ = scene;
    this.world_ = world;
    this.justin_ = justin;
    this.cursorKeys_ = cursorKeys;

    this.sprite_ = scene.physics.add.sprite(0, 0, 'girl');
    this.sprite_.displayWidth = Config.PATTY_SPRITE_WIDTH * Config.PATTY_SCALE;
    this.sprite_.displayHeight =
        Config.PATTY_SPRITE_HEIGHT * Config.PATTY_SCALE;
    this.sprite_.depth = Depths.PATTY;
    this.sprite_.setCollideWorldBounds(true);

    this.heartTimer_ = 0;

    this.standAnimation_ = 'standDown';

    this.createAnimations_();

    scene.cameras.main.startFollow(this.sprite_);
  }

  teleportTo(x, y) {
    this.sprite_.x = x;
    this.sprite_.y = y;
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
    if (this.cursorKeys_.left.isDown) {
      this.sprite_.setVelocityX(-Config.PATTY_MOVE_SPEED);
      this.sprite_.setVelocityY(0);
      this.sprite_.flipX = true;
      this.sprite_.anims.play('moveRight', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standRight';
    } else if (this.cursorKeys_.right.isDown) {
      this.sprite_.setVelocityX(Config.PATTY_MOVE_SPEED);
      this.sprite_.setVelocityY(0);
      this.sprite_.flipX = false;
      this.sprite_.anims.play('moveRight', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standRight';
    } else if (this.cursorKeys_.up.isDown) {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(-Config.PATTY_MOVE_SPEED);
      this.sprite_.anims.play('moveUp', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standUp';
    } else if (this.cursorKeys_.down.isDown) {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(Config.PATTY_MOVE_SPEED);
      this.sprite_.anims.play('moveDown', true /* ignoreIfPlaying */);
      this.standAnimation_ = 'standDown';
    } else {
      this.sprite_.setVelocityX(0);
      this.sprite_.setVelocityY(0);
      this.sprite_.anims.play(this.standAnimation_);
    }

    if (Math.abs(this.sprite_.x - this.justin_.x)
        + Math.abs(this.sprite_.y - this.justin_.y)
        < Config.PATTY_JUSTIN_HEART_PROXIMITY) {
      this.heartTimer_++;
    } else {
      this.heartTimer_ = 0;
    }
    if (this.heartTimer_ >= Config.PATTY_HEART_PERIOD) {
      const randX = Math.floor(Math.random() * 2 * Config.PATTY_HEART_SPREAD);
      const randY = Math.floor(Math.random() * 2 * Config.PATTY_HEART_SPREAD);
      const heartSpriteCenter = {
        x: this.sprite_.x + randX - Config.PATTY_HEART_SPREAD,
        y: this.sprite_.y - this.sprite_.displayHeight / 2 + randY
            - Config.PATTY_HEART_SPREAD
      };
      const heartSprite = this.scene_.add.sprite(
          heartSpriteCenter.x, heartSpriteCenter.y, 'heart');
      heartSprite.displayWidth = Config.PATTY_HEART_WIDTH_PX;
      heartSprite.displayHeight = Config.PATTY_HEART_HEIGHT_PX;
      heartSprite.depth = Depths.HEART;
      const heartTween = this.scene_.tweens.add({
        targets: heartSprite,
        duration: Config.PATTY_HEART_FLOAT_DURATION,
        y: heartSpriteCenter.y - Config.PATTY_HEART_FLOAT_DISTANCE,
        alpha: 0
      });
      heartTween.setCallback('onComplete', function() {
        heartSprite.destroy();
      }, [] /* params */);
      this.heartTimer_ = 0;
    }
  }
}