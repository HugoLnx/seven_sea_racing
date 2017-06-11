Sprites.NonCroppedFullBackground = cc.Sprite.extend({
  ctor: function(background_image, frameSize) {
    this._super();
    this.initWithFile(background_image);
    this.setPosition(frameSize.width/2, frameSize.height/2);
    var result = Lib.Math.expandInFrameWithoutCrop({
      elementSize: {width: this.width, height: this.height},
      frameSize: frameSize
    });
    this.setScale(result.scale, result.scale);
  },
  
  size: function() {
    return {width: this.width * this.getScaleX(), height: this.height * this.getScaleY()};
  },

  scale: function() {
    return this.getScaleX();
  }
});
