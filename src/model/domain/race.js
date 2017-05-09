Model.Domain.Race = function(racer) {
  this.currentFrame = 0;
  this.objects = [racer];
  this.racer = racer;

  this.add = function(obj) {
    this.objects.push(obj);
  };

  this.update = function() {
    this.currentFrame++;
    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].behave(this.currentFrame);
    }

    Model.Physics.Universe.instance().update();

    for(var i = 0; i<this.objects.length; i++) {
      this.objects[i].update();
    }
  };

  this.calculateCameraPosition = function() {
    var x = cc.winSize.width/2-this.racer.body.x();
    var y = cc.winSize.height/2-this.racer.body.y();
    return {x: x, y: y};
  }
};
