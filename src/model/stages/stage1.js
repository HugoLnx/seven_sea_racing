Model.Stages.Stage1 = {
  width: 3252,
  height: 1816,
  timeLimitSeconds: 3*60,
  background: function(){return res.background_png;},
  objects: function() {
    this.objs = this.objs || {
      racer: Model.Domain.Racer.build({x: 0.00*this.width, y: 0.28*this.height}, 0),
      others: [
        Model.Domain.Enemy.build({x: 0.20*this.width, y: 0.19*this.height}, 90),
        Model.Domain.Turbo.build({x: 0.10*this.width, y: 0.35*this.height}),

        Model.Domain.BadGround.build({x: -this.width/2.0, y: 0}, {width: this.width*0.6, height: this.height})
      ]
    };
    return this.objs;
  },
  allObjects: function() {
    return [this.objects().racer].concat(this.objects().others);
  },
  sprites: function() {
    this.sprts = this.sprts || this._sprites();
    return this.sprts;
  },
  _sprites: function() {
    var objects = this.allObjects();
    var sprites = [];
    for(var i = 0; i<objects.length; i++) {
      if(objects[i].sprite) {
        sprites.push(objects[i].sprite);
      }
    }
    return sprites;
  }
};
