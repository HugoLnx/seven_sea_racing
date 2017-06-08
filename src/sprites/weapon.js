Sprites.Weapon = cc.Sprite.extend({
  ctor: function(image) {
    this._super();
    this.initWithFile(image);
    this.setScale(0.5, 0.5);
  },
  update: function(x, y) {
    this.setPosition(x, y);
  },
  size: function() {
    return {width: this.width * this.getScaleX(), height: this.height * this.getScaleY()};
  }
});
