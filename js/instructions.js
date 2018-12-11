class Instructions {
  constructor(scene) {
    this.scene_ = scene;
    this.instructionTexts_ = [];

    this.addAllInstructions_();

    this.backdrop_ = scene.add.graphics();
    this.backdrop_.fillStyle(0x000000);
    this.backdrop_.fillRect(-10000, -10000, 20000, 20000);
    this.backdrop_.alpha = 0.6;
    this.backdrop_.depth = Depths.INSTRUCTIONS_BACKDROP;
    this.backdrop_.visible = false;
  }

  toggleVisibility() {
    this.backdrop_.visible = !this.backdrop_.visible;
    this.instructionTexts_.forEach(t => {t.visible = !t.visible;});
  }

  addAllInstructions_() {
    const f = this.addText_.bind(this);
    const normalColor = 'white';
    const keyColor = 'orange';
    const giftColor = 'yellow';
    const lineHeight = 25;
    
    var left = Config.WORLD_WIDTH_PX / 2 - 270;
    var top = Config.WORLD_HEIGHT_PX / 2 + 110;

    // Show instructions at the top.
    f('Move with the', left, top, normalColor);
    f('arrow keys', left + 168, top, keyColor);
    f('.', left + 290, top, normalColor);
    
    top += lineHeight;
    f('Press', left, top, normalColor);
    f('G', left + 71, top, keyColor);
    f('to get your', left + 93, top, normalColor);
    f('gift', left + 237, top, giftColor);
    f('from', left + 296, top, normalColor);
    f('Santa', left + 357, top, '#ec0000');
    f('!', left + 419, top, normalColor);

    top += lineHeight;
    f('Don\'t let the', left, top, normalColor);
    f('Grinch', left + 168, top, '#6bef08');
    f('run away with your', left + 252, top, normalColor);
    f('gift', left + 479, top, giftColor);
    f('.', left + 529, top, normalColor);

    top += lineHeight;
    f('Hold', left, top, normalColor);
    f('Space', left + 60, top, keyColor);
    f('to make them go faster.', left + 130, top, normalColor);

    top += 2 * lineHeight;
    f('Press', left, top, normalColor);
    f('I', left + 71, top, keyColor);
    f('to hide these instructions.', left + 93, top, normalColor);

    left = 14;
    top = Config.WORLD_HEIGHT_PX - lineHeight;
    f('Press', left, top, normalColor, true);
    f('I', left + 71, top, keyColor, true);
    f('for instructions.', left + 93, top, normalColor, true);
  }

  addText_(s, x, y, color, initiallyVisible) {
    const text = this.scene_.add.text(x, y, s);
    text.depth = Depths.INSTRUCTIONS_TEXT;
    text.setColor(color);
    text.setFontSize(20);
    text.visible = !!initiallyVisible;
    this.instructionTexts_.push(text);
  }
}