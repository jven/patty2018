class VictoryCutscene {
  constructor(scene, patty, gift, directorState) {
    this.scene_ = scene;
    this.patty_ = patty;
    this.gift_ = gift;
    this.directorState_ = directorState;

    this.flashGraphics_ = scene.add.graphics();
    this.flashGraphics_.fillStyle(0xffffff);
    this.flashGraphics_.fillRect(-10000, -10000, 20000, 20000);
    this.flashGraphics_.depth = Depths.FLASH;
    this.flashGraphics_.visible = false;

    this.cathyText_ = scene.add.text(
        80,
        Config.WORLD_HEIGHT_PX / 2,
        'Tell Cathy you solved it! :)');
    this.cathyText_.setColor('#ffffcc');
    this.cathyText_.setFontSize(30);
    this.cathyText_.setStroke('black', 5);
    this.cathyText_.fontWeight = 'bold';
    this.cathyText_.depth = Depths.FLASH;
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
      this.pulsateCathyText_();
    }, [] /* params */, this);
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
}