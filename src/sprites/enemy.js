Sprites.Enemy = cc.SpriteBatchNode.extend({
  rectangle: null,
  ctor: function() {
    cc.spriteFrameCache.addSpriteFrames(res.urchin_plist);
    var SCALE = 0.5;
    this._super();
    this.initWithFile(res.urchin_png);
    this.frames = this.animationFrames();
    this.sprite = new cc.Sprite("#urchin01.png");
    this.setScale(SCALE, SCALE);
    this.startAnimation();
    this.addChild(this.sprite);
  },
  update: function(x, y) {
    this.setPosition(x, y);
    this.sprite.setFlippedX(true);
  },
  startAnimation: function() {
    var animation = new cc.Animation(this.frames, 0.12);
    var action = new cc.RepeatForever(new cc.Animate(animation));
    this.sprite.runAction(action);
  },
  animationFrames: function() {
    var allFrames = []
    for(var i = 1; i <= 4; i++) {
      var frame = cc.spriteFrameCache.getSpriteFrame("urchin0"+i+".png");
      allFrames.push(frame)
    }
    return [
      allFrames[0],
      allFrames[0],
      allFrames[1],
      allFrames[1],
      allFrames[0],
      allFrames[0],
      allFrames[1],
      allFrames[1],
      allFrames[0],
      allFrames[0],
      allFrames[1],
      allFrames[2],
      allFrames[3],
      allFrames[3],
      allFrames[2],
      allFrames[1]
    ];
  },
  size: function() {
    return {width: this.sprite.width * this.getScaleX(), height: this.sprite.height * this.getScaleY()};
  }
});
