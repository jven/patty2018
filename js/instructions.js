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
    const pattyColor = '#d07b4c';
    const keyColor = 'orange';
    const giftColor = 'yellow';
    const santaColor = '#ec0000';
    const grinchColor = '#6bef08';
    const lineHeight = 25;
    
    var left = Config.WORLD_WIDTH_PX / 2 - 270;
    var top = Config.WORLD_HEIGHT_PX / 2 + 60;

    // Show instructions at the top.
    f('Help', left, top, normalColor);
    f('Patty', left + 61, top, pattyColor);
    f('get her', left + 61 + 71, top, normalColor);
    f('gift', left + 61 + 71 + 95, top, giftColor);
    f('from', left + 61 + 71 + 95 + 58, top, normalColor);
    f('Santa', left + 61 + 71 + 95 + 58 + 61, top, santaColor);
    f('!', left + 61 + 71 + 95 + 58 + 61 + 65, top, normalColor);

    top += 2 * lineHeight;
    f('Move', left, top, normalColor);
    f('Patty', left + 61, top, pattyColor);
    f('with the', left + 61 + 71, top, normalColor);
    f('arrow keys', left + 61 + 71 + 107, top, keyColor);
    f('.', left + 61 + 71 + 107 + 125, top, normalColor);
    
    top += lineHeight;
    f('Press', left, top, normalColor);
    f('G', left + 72, top, keyColor);
    f('to make', left + 72 + 22, top, normalColor);
    f('Santa', left + 72 + 22 + 95, top, santaColor);
    f('bring the', left + 72 + 22 + 95 + 71, top, normalColor);
    f('gift', left + 72 + 22 + 95 + 71 + 119, top, giftColor);
    f('!', left + 72 + 22 + 95 + 71 + 119 + 53, top, normalColor);

    top += lineHeight;
    f('Don\'t let the', left, top, normalColor);
    f('Grinch', left + 168, top, grinchColor);
    f('run away with the', left + 168 + 84, top, normalColor);
    f('gift', left + 168 + 84 + 215, top, giftColor);
    f('.', left + 168 + 84 + 215 + 53, top, normalColor);

    top += lineHeight;
    f('Hold', left, top, normalColor);
    f('Space', left + 60, top, keyColor);
    f('to make', left + 60 + 70, top, normalColor);
    f('Santa', left + 60 + 70 + 96, top, santaColor);
    f('and the', left + 60 + 70 + 96 + 70, top, normalColor);
    f('Grinch', left + 60 + 70 + 96 + 70 + 96, top, grinchColor);

    top += lineHeight;
    f('run faster.', left + 60, top, normalColor);

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