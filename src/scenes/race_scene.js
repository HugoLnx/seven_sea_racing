Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    this.race = new Model.Domain.Race();

    this.gameLayer = new Layers.RaceLayer();
    this.gameLayer.init(this.race);
    Model.Controls.resetInstance();
    Model.Controls.instance(this.gameLayer.bgSprite);
    this.hud = new Layers.HUD();
    this.hud.init(this.race.racer.maxHealth);
    this.update(0);
    this.addChild(this.gameLayer, 0);
    this.addChild(this.hud, 1);
    if(this.collisionBoxesActivated()) {
      var bodies = Model.Physics.Universe.instance().bodies;
      for(var i = 0; i<bodies.length; i++) {
        Sprites.CollisionBox.createFor(bodies[i]);
      }  
    }
    Sprites.CollisionBox.addAllTo(this.gameLayer, 2);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update(dt);
    var weapon = this.race.racer.weapon;
    this.hud.update(this.race.racer.health, weapon && weapon.sprite);

    var scenePosition = this.race.calculateCameraPosition();
    this.gameLayer.setPosition(scenePosition.x, scenePosition.y);
    //this.gameLayer.setScale(0.12, 0.12);

    if(this.collisionBoxesActivated()) Sprites.CollisionBox.update();
  },
  collisionBoxesActivated: function() {
    return document && document.location && document.location.href && document.location.href.includes("collisionBoxes");
  },
});
