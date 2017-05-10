Layers.RaceLayer = cc.Layer.extend({
  init: function(sprites) {
    this._super();
    for(var i = 0; i<sprites.length; i++) {
      this.addChild(sprites[i], 0);
    }  
  }
});
