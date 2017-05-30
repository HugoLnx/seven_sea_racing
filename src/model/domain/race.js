Model.Domain.Race = function(racer) {
  this.width = 3252;
  this.height = 1816;
  this.currentFrame = 0;

  this.init = function() {
    var racer = Model.Domain.Racer.build({x: 0.018*this.width, y: 0.37*this.height}, 0);
    var enemy = Model.Domain.Enemy.build({x: 0.2*this.width, y: 0.35*this.height}, 90);
    this.objects = [racer, enemy]
    this.racer = racer;
    window.s = this.racer.sprite;
    var limits = this.calculateRacerLimits();
    Model.Physics.Universe.instance().setLimits(limits)
  };

  this.sprites = function() {
    var sprites = [];
    for(var i = 0; i<this.objects.length; i++) {
      sprites.push(this.objects[i].sprite);
    }
    return sprites;
  };

  this.add = function(obj) {
    this.objects.push(obj);
  };

  this.update = function(deltaTime) {
    this.currentFrame++;

    Model.Physics.Universe.instance().applyFriction(deltaTime);

    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].behave(this.currentFrame, deltaTime);
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
        min: -this.width/2+cc.winSize.width,
        max: this.width/2,
      },
      y: {
        min: -this.height/2+cc.winSize.height,
        max: this.height/2,
      }
    };
  };

  this.init();
};
