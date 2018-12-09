class Instructions {
  static show(scene) {
    const s = scene;
    const f = Instructions.addText_;
    const normalColor = 'white';
    const keyColor = 'orange';
    const giftColor = 'yellow';
    const lineHeight = 25;
    
    var left = Config.WORLD_WIDTH_PX + 10;
    var top = Config.WORLD_HEIGHT_PX / 2 - 80;

    // Show instructions at the top.
    f(s, 'Move with the', left, top, normalColor);
    f(s, 'arrow keys', left + 168, top, keyColor);
    f(s, '.', left + 290, top, normalColor);
    
    top += lineHeight;
    f(s, 'Press', left, top, normalColor);
    f(s, 'G', left + 71, top, keyColor);
    f(s, 'to get your', left + 93, top, normalColor);
    f(s, 'gift', left + 237, top, giftColor);
    f(s, 'from', left + 296, top, normalColor);
    f(s, 'Santa', left + 357, top, '#ec0000');
    f(s, '!', left + 419, top, normalColor);

    top += lineHeight;
    f(s, 'Hold', left, top, normalColor);
    f(s, 'Space', left + 60, top, keyColor);
    f(s, 'to make him go faster.', left + 130, top, normalColor);

    top += lineHeight;
    f(s, 'Don\'t let the', left, top, normalColor);
    f(s, 'Grinch', left + 168, top, '#6bef08');
    f(s, 'run away with your', left + 252, top, normalColor);
    f(s, 'gift', left + 479, top, giftColor);
    f(s, '.', left + 529, top, normalColor);
  }

  static addText_(scene, s, x, y, color) {
    const text = scene.add.text(x, y, s);
    text.depth = Depths.INSTRUCTIONS_TEXT;
    text.setColor(color);
    text.setFontSize(20);
  }
}