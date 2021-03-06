Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    var stage = Model.Stages.Stage1;
    this._super();
    this.race = new Model.Domain.Race(stage);

    this.gameLayer = new Layers.RaceLayer();
    this.gameLayer.init(stage);
    Model.Controls.resetInstance();
    Model.Controls.instance(this.gameLayer.trackSprite);
    this.startCounting = new Layers.StartCounting();
    this.startCounting.init();
    this.hud = new Layers.HUD();
    this.hud.init(this.race.racer.maxHealth);
    this.update(0);
    this.addChild(this.gameLayer, 0);
    this.addChild(this.hud, 1);
    this.addChild(this.startCounting);
    if(this.collisionBoxesActivated()) {
      var bodies = Model.Physics.Universe.instance().bodies;
      for(var i = 0; i<bodies.length; i++) {
        Sprites.CollisionBox.createFor(bodies[i]);
      }  
    }
    Sprites.CollisionBox.addAllTo(this.gameLayer, 100);
    this.startCounting.scheduleIncrement();
    var race = this.race;
    this.startCounting.onFinish(function() {
      race.enableControls();
    });
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.startCounting.update(dt);
    this.race.update(dt);
    var weapon = this.race.racer.weapon;
    this.hud.update(this.race.racer.health, weapon && weapon.sprite, this.race.timeLeft);

    var scenePosition = this.gameLayer.cameraFollow(this.race.racer.body.position());

    if(this.collisionBoxesActivated()) Sprites.CollisionBox.update();
  },
  collisionBoxesActivated: function() {
    return document && document.location && document.location.href && document.location.href.includes("collisionBoxes");
  },
});
