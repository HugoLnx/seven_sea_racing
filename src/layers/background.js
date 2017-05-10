Layers.Background = cc.Layer.extend({
  sprite: null,
  init: function() {
    this._super();
    this.setAnchorPoint(0, 0);
    var sprite = cc.Sprite.create(res.background_png);
    sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    sprite.setScale(1, 1);
    this.addChild(sprite);
    this.sprite = sprite;
  },
  
  size: function() {
    return {width: this.sprite.width * this.sprite.getScaleX(), height: this.sprite.height * this.sprite.getScaleY()};
  }
});
