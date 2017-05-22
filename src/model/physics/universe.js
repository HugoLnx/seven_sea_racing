Model.Physics.Universe = (function() {
  var M = function() {
    this.bodies = [];

    this.applyFriction = function(deltaTime) {
      for(var i = 0; i<this.bodies.length; i++) {
        this.bodies[i].applyFrictionForce(600000, deltaTime);
      }
    };

    this.update = function(deltaTime) {
      for(var i = 0; i<this.bodies.length; i++) {
        var body = this.bodies[i];
        body.update(deltaTime);
      }


      for(var i = 0; i<(this.bodies.length-1); i++) {
        for(var j = i+1; j<this.bodies.length; j++) {
          var body1 = this.bodies[i];
          var body2 = this.bodies[j];
          if(body1.collides(body2)) {
            //console.log("Collided!",body1, body2);
            console.log("Collided!");
            // TODO: tratar colisão
          }
        }
      }
    };

    this.add = function(body) {
      this.bodies.push(body);
    };
  };

  M.instance = function() {
    if(this.currentInstance === undefined)
      this.currentInstance = new M();
    return this.currentInstance;
  };

  M.dropInstance = function() {
    this.currentInstance = undefined;
  }

  return M;
}());
