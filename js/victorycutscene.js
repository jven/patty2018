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
  }
}