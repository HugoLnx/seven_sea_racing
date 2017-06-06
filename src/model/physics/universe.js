Model.Physics.Universe = (function() {
  var M = function() {
    this.bodies = [];

    this.setLimits = function(limits) {
      this.minX = limits.x.min;
      this.maxX = limits.x.max;
      this.minY = limits.y.min;
      this.maxY = limits.y.max;
    };

    this.applyFriction = function(deltaTime) {
      for(var i = 0; i<this.bodies.length; i++) {
        this.bodies[i].applyFriction(300, deltaTime);
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
          if(body1.hasCollided(body2)) {
            applyCollision(body1, body2);
          }
        }
      }

      for(var i = 0; i<this.bodies.length; i++) {
        this.ensureUniverseLimits(this.bodies[i]);
      }
    };

    this.add = function(body) {
      this.bodies.push(body);
    };

    this.remove = function(body) {
      var inx = null;
      for(var i = 0; i<this.bodies.length; i++) {
        
        if(this.bodies[i] === body) {
          inx = i;
        }
      }  
      if(inx !== null) {
        var body = this.bodies.splice(inx, 1)[0];
        body.destroy();
      }
    }

    this.ensureUniverseLimits = function(body) {
      if(body.x() < this.minX) {
        body.x(this.minX);
        body.acc.x = 0;
        body.vel.x = 0;
      }
      if(body.x() > this.maxX) {
        body.x(this.maxX);
        body.acc.x = 0;
        body.vel.x = 0;
      }
      if(body.y() < this.minY) {
        body.y(this.minY);
        body.acc.y = 0;
        body.vel.y = 0;
      }
      if(body.y() > this.maxY) {
        body.y(this.maxY);
        body.acc.y = 0;
        body.vel.y = 0;
      }
    };
  };

  function applyCollision(body1, body2) {
    callCollisionCallbacks(body1, body2);
    var posOnX = overlapEffect(body1.x(), body1.width , body1.weight, body2.x(), body2.width , body2.weight);
    var posOnY = overlapEffect(body1.y(), body1.height, body1.weight, body2.y(), body2.height, body2.weight);
    if(posOnX.movementAmount < posOnY.movementAmount) {
      body1.x(posOnX.pos1);
      body2.x(posOnX.pos2);
    } else {
      body1.y(posOnY.pos1);
      body2.y(posOnY.pos2);
    }

    var velsOnX = collisionVelocityEffect(body1.vel.x, body1.weight, body2.vel.x, body2.weight);
    var velsOnY = collisionVelocityEffect(body1.vel.y, body1.weight, body2.vel.y, body2.weight);
    body1.velocity({x: velsOnX.vel1, y: velsOnY.vel1});
    body2.velocity({x: velsOnX.vel2, y: velsOnY.vel2});
  }

  function callCollisionCallbacks(body1, body2) {
    var model1 = body1.related;
    var model2 = body2.related;
    model1.onCollision && model1.onCollision(model2);
    model2.onCollision && model2.onCollision(model1);
  }

  function collisionVelocityEffect(vel1, weight1, vel2, weight2) {
    var newVel = (vel1*weight1 + vel2*weight2)/(weight1 + weight2);
    return {
      vel1: newVel,
      vel2: newVel
    };
  }

  function overlapEffect(pos1, size1, weight1, pos2, size2, weight2) {
    if(pos1 < pos2) {
      var first = {
        pos: pos1,
        size: size1,
        weight: weight1
      };
      var second = {
        pos: pos2,
        size: size2,
        weight: weight2
      };
    } else {
      var first = {
        pos: pos2,
        size: size2,
        weight: weight2
      };
      var second = {
        pos: pos1,
        size: size1,
        weight: weight1
      };
    }

    var firstCollisionEdge = first.pos + first.size/2;
    var secondCollisionEdge = second.pos - second.size/2;

    var neededMovement = firstCollisionEdge - secondCollisionEdge;
    var firstMovement  = neededMovement * (first.weight / (first.weight*second.weight));
    var secondMovement = neededMovement * (second.weight / (first.weight*second.weight));
    if(pos1 < pos2) {
      return {
        pos1: pos1 - firstMovement,
        pos2: pos2 + secondMovement,
        movementAmount: neededMovement
      };
    } else {
      return {
        pos1: pos1 + secondMovement,
        pos2: pos2 - firstMovement,
        movementAmount: neededMovement
      };
    }
  }

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
