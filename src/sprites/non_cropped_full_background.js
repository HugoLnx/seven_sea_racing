Sprites.NonCroppedFullBackground = cc.Sprite.extend({
  ctor: function(background_image, frameSize) {
    this._super();
    this.initWithFile(background_image);
    Sprites.NonCroppedFullBackground.scaleToFrame(this, frameSize)
  },
  
  size: function() {
    return {width: this.width * this.getScaleX(), height: this.height * this.getScaleY()};
  },

  scale: function() {
    return this.getScaleX();
  }
});

Sprites.NonCroppedFullBackground.scaleToFrame = function(object, frameSize) {
  var result = Lib.Math.expandInFrameWithoutCrop({
    elementSize: {width: object.width, height: object.height},
    frameSize: frameSize
  });
  object.setScale(result.scale, result.scale);
};
