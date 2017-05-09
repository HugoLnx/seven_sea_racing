Sprites.Racer = cc.Sprite.extend({
  ctor: function() {
    var SCALE = 0.25;
    this._super();
    this.initWithFile(res.horsefish_png);
    this.setScale(SCALE, SCALE);
  },
  update: function(x, y, direction) {
    this.setPosition(x, y);
    if(direction > 90 && direction < 270) {
      this.setFlippedY(true);
    } else {
      this.setFlippedY(false);
    }
    this.setRotation(-direction);
  }
});
