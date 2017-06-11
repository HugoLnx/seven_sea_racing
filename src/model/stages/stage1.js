Model.Stages.Stage1 = {
  width: 3252,
  height: 1816,
  timeLimitSeconds: 3*60,
  background_track: function(){return res.background_track_png;},
  background_layers: function(){
    return [
      {
        image: res.background_layer5_png,
        scale: 1.05
      },
      {
        image: res.background_layer3_png,
        scale: 1.025
      },
      {
        image: res.background_layer4_png,
        scale: 1.01
      }
    ];
  },
  objects: function() {
    this.objs = this.objs || {
      racer: Model.Domain.Racer.build({x: 0.00*this.width, y: 0.28*this.height}, 0),
      others: [
        Model.Domain.Enemy.build({x: 0.20*this.width, y: 0.19*this.height}, 90),
        Model.Domain.Turbo.build({x: 0.10*this.width, y: 0.35*this.height}),

        Model.Domain.BadGround.build({x: 0, y: this.height*0.45}, {width: this.width, height: this.height*0.15}),
        Model.Domain.BadGround.build({x: -this.width*0.2,  y: this.height*0.1}, {width: this.width*0.2, height: this.height*0.7}),
        Model.Domain.BadGround.build({x: -this.width*0.19, y: this.height*0.23},{width: this.width*0.23, height: this.height*0.65}),
        Model.Domain.BadGround.build({x:  this.width*0.15, y: this.height*0.1}, {width: this.width*0.5 , height: this.height*0.14}),
        Model.Domain.BadGround.build({x: -this.width*0.1,  y:-this.height*0.01},{width: this.width*0.25, height: this.height*0.36})
      ]
    };
    s = this;
    bad = this.objs.others[2].body;
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
