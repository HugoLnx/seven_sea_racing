Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    var racer = Model.Domain.Racer.build();
    this.race = new Model.Domain.Race(racer);

    this.gameLayer = new Layers.RaceLayer();
    var bgLayer = new Layers.Background();
    this.gameLayer.init(racer.sprite);
    bgLayer.init();
    this.addChild(bgLayer, 0);
    this.addChild(this.gameLayer, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update();

    var scenePosition = this.race.calculateCameraPosition();
    this.setPosition(scenePosition.x, scenePosition.y);
  }
});
