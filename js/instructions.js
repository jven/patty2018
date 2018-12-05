class Instructions {
  static show(scene) {
    const s = scene;
    const f = Instructions.addText_;
    const normalColor = 'white';
    const keyColor = 'orange';
    const lineHeight = 25;
    
    var top = Config.WORLD_HEIGHT_PX + 10;

    // Show instructions at the top.
    f(s, 'Move with the', 0, top, normalColor);
    f(s, 'arrow keys', 168, top, keyColor);
    f(s, '.', 290, top, normalColor);
    
    top += lineHeight;
    f(s, 'Press', 0, top, normalColor);
    f(s, 'N', 71, top, keyColor);
    f(s, 'to get your gift from', 93, top, normalColor);
    f(s, 'Santa', 358, top, '#ec0000');
    f(s, '!', 420, top, normalColor);

    top += lineHeight;
    f(s, 'Hold', 0, top, normalColor);
    f(s, 'Space', 60, top, keyColor);
    f(s, 'to make him go faster.', 130, top, normalColor);

    top += lineHeight;
    f(s, 'Don\'t let the', 0, top, normalColor);
    f(s, 'Grinch', 168, top, '#6bef08');
    f(s, 'run away with your gift.', 252, top, normalColor);

    top += lineHeight;
    f(s, 'Press', 0, top, normalColor);
    f(s, 'R', 71, top, keyColor);
    f(s, 'to start over.', 93, top, normalColor);
  }

  static addText_(scene, s, x, y, color) {
    const text = scene.add.text(x, y, s);
    text.depth = Depths.INSTRUCTIONS_TEXT;
    text.setColor(color);
    text.setFontSize(20);
  }
}