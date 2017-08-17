Layers.RaceLayer = cc.Layer.extend({
  trackSprite: null,
  init: function(stage) {
    this._super();
    var sprites = stage.sprites();
    var trackSprite = this.createBackgroundTrack(stage);
    var layers = this.createBackgroundLayers(stage);
    this.setScale(this.scale(), this.scale());
    //for(var i = 0; i < layers.length; i++) {
    //  this.addChild(layers[i].sprite, i);
    //}
    this.addChild(trackSprite, layers.length);
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], layers.length+1);
    }  
    this.trackSprite = trackSprite;
    this.layers = layers;
    this.stage = stage;
  },
  createBackgroundTrack: function(stage) {
    var sprite = new Layers.TrackLayer();
    sprite.init(stage.background_track(), 11, {width: stage.width, height: stage.height});
    s = sprite;
    return sprite;
  },
  createBackgroundLayers: function(stage) {
    var layers = [];
    var background_layers = stage.background_layers();
    for(var i = 0; i<background_layers.length; i++) {
      var layer = background_layers[i];
      var minSize = {width: stage.width+cc.winSize.width/this.scale(), height: stage.height+cc.winSize.height/this.scale()};
      var sprite = new Sprites.CroppedFullBackground(layer.image, {width: minSize.width*layer.scale, height: minSize.height*layer.scale});
      sprite.setPosition(0, 0);
      layers.push({minSize: minSize, sprite: sprite, scale: layer.scale});
    }  
    return layers;
  },
  scale: function() {
    return 0.5; // 0.12;
  },
  size: function() {
    return {width: this.width*this.scale(), height: this.height*scale()};
  },
  toCenter: function() {
    this.setPosition(-cc.winSize.width*(1-this.scale())/2+cc.winSize.width/2, -cc.winSize.height*(1-this.scale())/2+cc.winSize.height/2);
  },
  cameraFollow: function(position) {
    var cameraPosition = this.calculateCameraPositionFor(position);
    this.setPosition(cameraPosition.x, cameraPosition.y);
    for(var i = 0; i<this.layers.length; i++) {
      var layer = this.layers[i];
      var movementSpace = {x: layer.minSize.width*(layer.scale-1), y: layer.minSize.height*(layer.scale-1)};
      var seaX = movementSpace.x*(position.x/this.stage.width);
      var seaY = movementSpace.y*(position.y/this.stage.height);
      layer.sprite.setPosition(-seaX, -seaY);
    }
  },
  calculateCameraPositionFor: function(position) {
    var x = (cc.winSize.width/2-position.x)*this.scale();
    var y = (cc.winSize.height/2-position.y)*this.scale();
    return {x: x, y: y};
  }
});
