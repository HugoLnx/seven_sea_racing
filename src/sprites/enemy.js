Sprites.Enemy = cc.Sprite.extend({
  ctor: function() {
    var SCALE = 0.5;
    this._super();
    this.initWithFile(res.enemy_png);
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
