Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    this.gameLayer = new Layers.RaceLayer();
    var bgLayer = new Layers.Background();
    bgLayer.init();

    this.race = new Model.Domain.Race();

    this.gameLayer.init(this.race.sprites());
    this.addChild(bgLayer, 0);
    this.addChild(this.gameLayer, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update(dt);

    var scenePosition = this.race.calculateCameraPosition();
    this.setPosition(scenePosition.x, scenePosition.y);
  }
});
