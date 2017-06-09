Model.Domain.Race = function(stage) {
  this.currentFrame = 0;

  this.init = function() {
    this.racer = stage.objects().racer;
    this.timeLeft = stage.timeLimitSeconds;
    this.width = stage.width;
    this.height = stage.height;
    this.objects = [this.racer].concat(stage.objects().others);
    var limits = this.calculateRacerLimits();
    Model.Physics.Universe.instance().setLimits(limits)
  };

  this.add = function(obj) {
    this.objects.push(obj);
  };

  this.update = function(deltaTime) {
    this.timeLeft -= deltaTime;
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

  this.calculateRacerLimits = function() {
    return {
      x: {
        min: -this.width/2,
        max: this.width/2,
      },
      y: {
        min: -this.height/2,
        max: this.height/2,
      }
    };
  };

  this.init();
};
