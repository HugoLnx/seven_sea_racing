Layers.CroppedFullBackground = cc.Layer.extend({
  sprite: null,
  init: function(background_image) {
    this._super();
    var sprite = cc.Sprite.create(background_image);
    sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    var result = Lib.Math.expandInFrame({
      elementSize: {width: sprite.width, height: sprite.height},
      frameSize: cc.winSize
    });
    sprite.setScale(result.scale, result.scale);
    this.addChild(sprite);
    this.sprite = sprite;
  },
  
  size: function() {
    return {width: this.sprite.width * this.sprite.getScaleX(), height: this.sprite.height * this.sprite.getScaleY()};
  },

  scale: function() {
    return this.sprite.getScaleX();
  }
});
