Layers.RaceLayer = cc.Layer.extend({
  player: null,
  init: function(racerSprite) {
    this._super();
    this.addChild(racerSprite, 0);
  }
});
