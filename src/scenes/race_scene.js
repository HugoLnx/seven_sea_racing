Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    this.gameLayer = new Layers.RaceLayer();
    var bgLayer = new Layers.Background();
    bgLayer.init();

    var racer = Model.Domain.Racer.build({x: 0.018*bgLayer.size().width, y: 0.37*bgLayer.size().height}, {x: 5, y: 0});
    this.race = new Model.Domain.Race(racer);

    var enemy = Model.Domain.Enemy.build({x: 0.2*bgLayer.size().width, y: 0.35*bgLayer.size().height}, {x: 0, y: 2});
    this.race.add(enemy);

    this.gameLayer.init([racer.sprite, enemy.sprite]);
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
