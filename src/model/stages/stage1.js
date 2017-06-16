Model.Stages.Stage1 = {
  width: 3252,
  height: 1816,
  timeLimitSeconds: 3*60,
  background_track: function(){return res.background_track_png;},
  background_layers: function(){
    return [
      {
        image: res.background_layer5_png,
        scale: 1.01
      },
      {
        image: res.background_layer3_png,
        scale: 1.05
      },
      {
        image: res.background_layer4_png,
        scale: 1.02
      }
    ];
  },
  objects: function() {
    this.objs = this.objs || {
      racer: Model.Domain.Racer.build({x: 0.00*this.width, y: 0.28*this.height}, 0),
      others: [
        Model.Domain.Enemy.build({x: 0.20*this.width, y: 0.19*this.height}, 90),
        Model.Domain.Turbo.build({x: 0.10*this.width, y: 0.35*this.height}),

        Model.Domain.BadGround.build({x: this.width*-0.50,  y: this.height*-0.06}, {width: this.width*0.06, height: this.height*-0.91}),
        Model.Domain.BadGround.build({x: this.width*0.04,  y: this.height*0.46}, {width: this.width*1.14, height: this.height*-0.15}),
        Model.Domain.BadGround.build({x: this.width*-0.45,  y: this.height*0.34}, {width: this.width*0.05, height: this.height*-0.09}),
        Model.Domain.BadGround.build({x: this.width*-0.47,  y: this.height*0.29}, {width: this.width*0.04, height: this.height*-0.04}),
        Model.Domain.BadGround.build({x: this.width*-0.40,  y: this.height*0.36}, {width: this.width*0.04, height: this.height*-0.06}),
        Model.Domain.BadGround.build({x: this.width*-0.17,  y: this.height*0.37}, {width: this.width*0.44, height: this.height*-0.04}),

        Model.Domain.BadGround.build({x: this.width*-0.38,  y: this.height*0.09}, {width: this.width*-0.04, height: this.height*0.08}),
        Model.Domain.BadGround.build({x: this.width*-0.38,  y: this.height*0.08}, {width: this.width*-0.02, height: this.height*0.12}),
        Model.Domain.BadGround.build({x: this.width*-0.37,  y: this.height*0.09}, {width: this.width*-0.04, height: this.height*0.05}),
        Model.Domain.BadGround.build({x: this.width*-0.19,  y: this.height*0.12}, {width: this.width*0.23, height: this.height*-0.47}),
        Model.Domain.BadGround.build({x: this.width*-0.31,  y: this.height*0.34}, {width: this.width*-0.03, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*-0.05,  y: this.height*0.32}, {width: this.width*0.05, height: this.height*-0.04}),
        Model.Domain.BadGround.build({x: this.width*-0.01,  y: this.height*0.34}, {width: this.width*0.03, height: this.height*-0.04}),
        Model.Domain.BadGround.build({x: this.width*-0.07,  y: this.height*0.31}, {width: this.width*0.04, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*-0.30,  y: this.height*-0.05}, {width: this.width*0.06, height: this.height*-0.07}),
        Model.Domain.BadGround.build({x: this.width*-0.29,  y: this.height*-0.04}, {width: this.width*0.06, height: this.height*-0.12}),
        Model.Domain.BadGround.build({x: this.width*-0.34,  y: this.height*-0.06}, {width: this.width*0.02, height: this.height*-0.03}),
        Model.Domain.BadGround.build({x: this.width*-0.13,  y: this.height*-0.01}, {width: this.width*-0.30, height: this.height*0.36}),
        Model.Domain.BadGround.build({x: this.width*-0.13,  y: this.height*-0.19}, {width: this.width*0.14, height: this.height*0.10}),
        Model.Domain.BadGround.build({x: this.width*-0.07,  y: this.height*-0.17}, {width: this.width*-0.05, height: this.height*0.08}),
        Model.Domain.BadGround.build({x: this.width*-0.21,  y: this.height*-0.19}, {width: this.width*-0.05, height: this.height*-0.09}),
        Model.Domain.BadGround.build({x: this.width*-0.07,  y: this.height*0.16}, {width: this.width*-0.04, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*-0.05,  y: this.height*0.16}, {width: this.width*-0.04, height: this.height*0.05}),
        Model.Domain.BadGround.build({x: this.width*0.03,  y: this.height*0.01}, {width: this.width*0.02, height: this.height*-0.40}),
        Model.Domain.BadGround.build({x: this.width*0.19,  y: this.height*0.10}, {width: this.width*-0.40, height: this.height*-0.12}),
        Model.Domain.BadGround.build({x: this.width*0.05,  y: this.height*0.02}, {width: this.width*0.06, height: this.height*-0.09}),
        Model.Domain.BadGround.build({x: this.width*0.09,  y: this.height*0.01}, {width: this.width*0.02, height: this.height*-0.04}),
        Model.Domain.BadGround.build({x: this.width*0.05,  y: this.height*-0.05}, {width: this.width*0.03, height: this.height*-0.04}),
        Model.Domain.BadGround.build({x: this.width*0.20,  y: this.height*0.05}, {width: this.width*0.12, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*0.15,  y: this.height*0.18}, {width: this.width*0.21, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.27,  y: this.height*0.16}, {width: this.width*0.08, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.32,  y: this.height*0.14}, {width: this.width*0.06, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.14,  y: this.height*0.22}, {width: this.width*0.12, height: this.height*0.04}),
        Model.Domain.BadGround.build({x: this.width*0.15,  y: this.height*0.24}, {width: this.width*0.05, height: this.height*-0.07}),
        Model.Domain.BadGround.build({x: this.width*0.38,  y: this.height*0.03}, {width: this.width*-0.04, height: this.height*0.22}),
        Model.Domain.BadGround.build({x: this.width*0.35,  y: this.height*0.03}, {width: this.width*-0.06, height: this.height*-0.07}),
        Model.Domain.BadGround.build({x: this.width*0.33,  y: this.height*0.03}, {width: this.width*-0.03, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*0.36,  y: this.height*-0.01}, {width: this.width*-0.03, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*0.34,  y: this.height*-0.17}, {width: this.width*0.14, height: this.height*-0.06}),
        Model.Domain.BadGround.build({x: this.width*0.36,  y: this.height*-0.19}, {width: this.width*-0.09, height: this.height*0.08}),
        Model.Domain.BadGround.build({x: this.width*0.31,  y: this.height*-0.19}, {width: this.width*-0.03, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*0.39,  y: this.height*-0.12}, {width: this.width*0.03, height: this.height*-0.11}),
        Model.Domain.BadGround.build({x: this.width*0.37,  y: this.height*-0.13}, {width: this.width*-0.04, height: this.height*0.06}),

        Model.Domain.BadGround.build({x: this.width*0.05,  y: this.height*-0.47}, {width: this.width*1.05, height: this.height*0.10}),
        Model.Domain.BadGround.build({x: this.width*-0.41,  y: this.height*-0.32}, {width: this.width*0.13, height: this.height*0.22}),
        Model.Domain.BadGround.build({x: this.width*-0.45,  y: this.height*-0.18}, {width: this.width*-0.06, height: this.height*-0.11}),
        Model.Domain.BadGround.build({x: this.width*-0.41,  y: this.height*-0.21}, {width: this.width*-0.07, height: this.height*-0.08}),
        Model.Domain.BadGround.build({x: this.width*-0.46,  y: this.height*-0.10}, {width: this.width*-0.03, height: this.height*-0.07}),
        Model.Domain.BadGround.build({x: this.width*-0.46,  y: this.height*-0.05}, {width: this.width*0.02, height: this.height*-0.13}),
        Model.Domain.BadGround.build({x: this.width*-0.43,  y: this.height*-0.12}, {width: this.width*0.02, height: this.height*-0.06}),
        Model.Domain.BadGround.build({x: this.width*-0.32,  y: this.height*-0.36}, {width: this.width*-0.09, height: this.height*-0.19}),
        Model.Domain.BadGround.build({x: this.width*-0.33,  y: this.height*-0.27}, {width: this.width*-0.05, height: this.height*0.06}),
        Model.Domain.BadGround.build({x: this.width*-0.34,  y: this.height*-0.24}, {width: this.width*0.01, height: this.height*0.04}),
        Model.Domain.BadGround.build({x: this.width*-0.19,  y: this.height*-0.40}, {width: this.width*-0.16, height: this.height*0.05}),
        Model.Domain.BadGround.build({x: this.width*-0.27,  y: this.height*-0.35}, {width: this.width*0.03, height: this.height*0.06}),
        Model.Domain.BadGround.build({x: this.width*0.53,  y: this.height*-0.03}, {width: this.width*-0.09, height: this.height*-0.85}),
        Model.Domain.BadGround.build({x: this.width*0.44,  y: this.height*0.36}, {width: this.width*0.15, height: this.height*0.16}),
        Model.Domain.BadGround.build({x: this.width*0.36,  y: this.height*0.36}, {width: this.width*-0.03, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.28,  y: this.height*0.40}, {width: this.width*0.20, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.32,  y: this.height*0.38}, {width: this.width*-0.06, height: this.height*-0.05}),
        Model.Domain.BadGround.build({x: this.width*0.46,  y: this.height*0.27}, {width: this.width*0.04, height: this.height*0.06}),
        Model.Domain.BadGround.build({x: this.width*0.47,  y: this.height*-0.34}, {width: this.width*-0.03, height: this.height*0.15}),
        Model.Domain.BadGround.build({x: this.width*0.26,  y: this.height*-0.40}, {width: this.width*-0.41, height: this.height*0.09}),
        Model.Domain.BadGround.build({x: this.width*0.15,  y: this.height*-0.29}, {width: this.width*0.11, height: this.height*0.14}),
        Model.Domain.BadGround.build({x: this.width*0.16,  y: this.height*-0.22}, {width: this.width*-0.06, height: this.height*-0.26}),
        Model.Domain.BadGround.build({x: this.width*0.13,  y: this.height*-0.21}, {width: this.width*0.03, height: this.height*0.07}),
        Model.Domain.BadGround.build({x: this.width*0.19,  y: this.height*-0.08}, {width: this.width*-0.05, height: this.height*-0.03}),
        Model.Domain.BadGround.build({x: this.width*0.21,  y: this.height*-0.34}, {width: this.width*-0.07, height: this.height*-0.09}),
        Model.Domain.BadGround.build({x: this.width*0.22,  y: this.height*-0.32}, {width: this.width*0.02, height: this.height*0.12}),
        Model.Domain.BadGround.build({x: this.width*0.26,  y: this.height*-0.34}, {width: this.width*0.03, height: this.height*0.06}),
        Model.Domain.BadGround.build({x: this.width*0.33,  y: this.height*-0.36}, {width: this.width*-0.04, height: this.height*0.03}),
        Model.Domain.BadGround.build({x: this.width*0.05,  y: this.height*-0.41}, {width: this.width*-0.07, height: this.height*0.06})

      ]
    };
    stage = this;
    bad = this.objs.others[3];
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
