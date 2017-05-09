Layers.Background = cc.Layer.extend({
  init: function() {
    this._super();
    var sprite = cc.Sprite.create(res.background_png);
    sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    sprite.setScale(1, 1);
    this.addChild(sprite);
  }
});
