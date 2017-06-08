Model.Domain.Race = function(racer) {
  this.width = 3252;
  this.height = 1816;
  this.currentFrame = 0;

  this.init = function() {
    var racer = Model.Domain.Racer.build({x: 0.00*this.width, y: 0.28*this.height}, 0);
    var enemy = Model.Domain.Enemy.build({x: 0.20*this.width, y: 0.19*this.height}, 90);
    var turbo = Model.Domain.Turbo.build({x: 0.10*this.width, y: 0.35*this.height});
    this.objects = [racer, enemy, turbo].concat(this.generateBadGrounds());
    this.racer = racer;
    var limits = this.calculateRacerLimits();
    Model.Physics.Universe.instance().setLimits(limits)
  };

  this.sprites = function() {
    var sprites = [];
    for(var i = 0; i<this.objects.length; i++) {
      if(this.objects[i].sprite) {
        sprites.push(this.objects[i].sprite);
      }
    }
    return sprites;
  };

  this.add = function(obj) {
    this.objects.push(obj);
  };

  this.update = function(deltaTime) {
    this.currentFrame++;

    Model.Physics.Universe.instance().applyFriction(deltaTime);

    var toRemove = [];
    for(var i = 0; i<this.objects.length; i++) {
      var mustBeRemoved = !this.objects[i].behave(this.currentFrame, deltaTime);
      if(mustBeRemoved) toRemove.push(i);
    }
    toRemove = toRemove.sort(function(a, b){ return b - a; })
    for(var i = 0; i<toRemove.length; i++) {
      this.objects.splice(toRemove[i], 1);
    }

    Model.Physics.Universe.instance().update(deltaTime);

    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].update(deltaTime);
    }
  };

  this.calculateCameraPosition = function() {
    var x = cc.winSize.width/2-this.racer.body.x();
    var y = cc.winSize.height/2-this.racer.body.y();
    return {x: x, y: y};
  }

  this.calculateRacerLimits = function() {
    return {
      x: {
        min: -this.width/2+cc.winSize.width/2,
        max: this.width/2-cc.winSize.width/2,
      },
      y: {
        min: -this.height/2+cc.winSize.height/2,
        max: this.height/2-cc.winSize.height/2,
      }
    };
  };

  this.generateBadGrounds = function() {
    return [
      Model.Domain.BadGround.build({x: -this.width/2.0, y: 0}, {width: this.width*0.6, height: this.height})
    ];
  };

  this.init();
};
