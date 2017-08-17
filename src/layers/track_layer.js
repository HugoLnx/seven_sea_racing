Layers.TrackLayer = cc.Layer.extend({
  pieces: null,
  _width: 0,
  _height: 0,
  init: function(pieces, row_size, frameSize) {
    this._super();
    var col_size = pieces.length/row_size;
    this.sprites = [];
    for(var i = 0; i < pieces.length; i++) {
      var sprite = new cc.Sprite(pieces[i]);
      var row = Math.floor(i / row_size);
      var col = i % row_size;
      if(this.sprites[row] === undefined) this.sprites[row] = [];
      this.sprites[row][col] = sprite;
      sprite.setAnchorPoint(0,1);
      this.addChild(sprite);
    }
    for(var col = 0; col < row_size; col++) {
      this._width += this.sprites[0][col].width;
    }
    for(var row = 0; row < col_size; row++) {
      this._height += this.sprites[row][0].height;
    }
    var x = -this._width;
    for(var col = 0; col < row_size; col++) {
      var y = 0;
      for(var row = 0; row < col_size; row++) {
        var sprite = this.sprites[row][col];
        sprite.setPosition(x, y);
        y -= sprite.height;
      }
      x += this.sprites[0][col].width;
    }
    this.width = this._width;
    this.height = this._height;
    Sprites.NonCroppedFullBackground.scaleToFrame(this, frameSize)
  },
  
  size: function() {
    return {width: this.width * this.getScaleX(), height: this.height * this.getScaleY()};
  },

  scale: function() {
    return this.getScaleX();
  }
});
