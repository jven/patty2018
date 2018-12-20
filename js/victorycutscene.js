class VictoryCutscene {
  constructor(scene, patty, gift, directorState, confettiSpriteKeys) {
    this.scene_ = scene;
    this.patty_ = patty;
    this.gift_ = gift;
    this.directorState_ = directorState;
    this.confettiSpriteKeys_ = confettiSpriteKeys;

    this.flashGraphics_ = scene.add.graphics();
    this.flashGraphics_.fillStyle(0xffffff);
    this.flashGraphics_.fillRect(-10000, -10000, 20000, 20000);
    this.flashGraphics_.depth = Depths.FLASH;
    this.flashGraphics_.visible = false;

    this.cathyText_ = scene.add.text(
        53,
        185,
        'Yay! Tell Cathy you solved it!');
    this.cathyText_.setColor('#ffffcc');
    this.cathyText_.setFontSize(30);
    this.cathyText_.setStroke('black', 5);
    this.cathyText_.fontWeight = 'bold';
    this.cathyText_.depth = Depths.CATHY_TEXT;
    this.cathyText_.visible = false;

    this.playing_ = false;
  }

  update() {
    if (this.playing_ || !this.directorState_.isVictorious()) {
      return;
    }

    const pattySprite = this.patty_.getSprite();
    const giftSprite = this.gift_.getSprite();
    const distance = Math.abs(pattySprite.x - giftSprite.x)
        + Math.abs(pattySprite.y - giftSprite.y);
    if (distance < Config.VICTORY_GIFT_PATTY_PROXIMITY) {
      this.play_();
    }
  }

  play_() {
    this.playing_ = true;
    this.flashGraphics_.visible = true;
    const flashTween = this.scene_.tweens.add({
      targets: this.flashGraphics_,
      duration: Config.VICTORY_FLASH_DURATION,
      alpha: 0
    });
    flashTween.setCallback('onComplete', function() {
      this.flashGraphics_.destroy();
    }, [] /* params */, this);
    
    this.pulsateCathyText_();
    this.spawnRandomConfetti_();
  }

  pulsateCathyText_() {
    this.cathyText_.visible = true;
    this.cathyText_.alpha = 0.2;
    const alphaUpTween = this.scene_.tweens.add({
      targets: this.cathyText_,
      duration: Config.VICTORY_CATHY_TEXT_PULSATE_DURATION,
      alpha: 1
    });
    alphaUpTween.setCallback(
        'onComplete',
        () => {
          const alphaDownTween = this.scene_.tweens.add({
            targets: this.cathyText_,
            duration: Config.VICTORY_CATHY_TEXT_PULSATE_DURATION,
            alpha: 0.2
          });
          alphaDownTween.setCallback(
              'onComplete',
              () => this.pulsateCathyText_(),
              [] /* params */);
        },
        [] /* params */)
  }

  spawnRandomConfetti_() {
    const x = Math.floor(Math.random() * Config.WORLD_WIDTH_PX);
    let endAngle = (Math.random() * 360 * 3) + 90;
    if (Math.random() < 0.5) {
      endAngle *= -1;
    }
    const keyIndex = Math.floor(
        Math.random() * this.confettiSpriteKeys_.length);
    const key = this.confettiSpriteKeys_[keyIndex];
    const confetti = this.scene_.add.sprite(x, -10, key);
    confetti.displayWidth *= Config.VICTORY_CONFETTI_SCALE;
    confetti.displayHeight *= Config.VICTORY_CONFETTI_SCALE;
    confetti.depth = Depths.CONFETTI;
    confetti.angle = 0;

    const yTween = this.scene_.tweens.add({
      targets: confetti,
      duration: Config.VICTORY_CONFETTI_DURATION,
      y: Config.WORLD_HEIGHT_PX + 10
    });
    const angleTween = this.scene_.tweens.add({
      targets: confetti,
      duration: Config.VICTORY_CONFETTI_DURATION,
      angle: endAngle
    });
    yTween.setCallback('onComplete', function() {
      confetti.destroy();
    }, [] /* params */);

    // Do it again!
    setTimeout(
        () => this.spawnRandomConfetti_(),
        Config.VICTORY_CONFETTI_FREQUENCY);
  }
}