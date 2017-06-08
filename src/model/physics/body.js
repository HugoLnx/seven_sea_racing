Model.Physics.Body = function(width, height, solid, weight) {
  this.pos = {x: 0, y: 0};
  this.vel = {x: 0, y: 0};
  this.acc = {x: 0, y: 0};
  this.width = width;
  this.height = height;
  this.solid = solid;
  this.weight = weight;
  this.maxAcc = 1000000000;
  this.maxVel = 1000000000;
  this.related = null;
  this.destroyed = false;

  this.x = function(value) {
    if(value === undefined) return this.pos.x;
    else this.pos.x = value;
  };

  this.y = function(value){
    if(value === undefined) return this.pos.y;
    else this.pos.y = value;
  };

  this.attachTo = function(raceObject) {
    this.related = raceObject;
  };

  this.size = function() {
    return {width: this.width, height: this.height};
  };

  this.position = function(value) {
    if(value === undefined) return this.pos;
    else this.pos = value;
  }

  this.velocity = function(value) {
    if(value === undefined) return this.vel;
    else this.vel = value;
  };

  this.velocityModulePercentage = function() {
    var velModule = Lib.Geometry.module(this.vel);
    return velModule / this.maxVelocity();
  };

  this.maxVelocity = function(value) {
    if(value === undefined) return this.maxVel;
    else this.maxVel = value;
  };

  this.maxAcceleration = function(value) {
    if(value === undefined) return this.maxAcc;
    else this.maxAcc = value;
  };

  this.direction = function() {
    return Lib.Geometry.angle(this.vel);
  };

  this.deltaVelocity = function(acc, t) {
    return acc*t;
  };

  this.deltaPosition = function(acc, vel, t) {
    return vel*t + acc/2*t*t;
  };
  
  this.accelerationEffect = function(acc, deltaTime) {
    return {
      pos: {
        x:  this.deltaPosition(acc.x, this.vel.x, deltaTime),
        y: this.deltaPosition(acc.y, this.vel.y, deltaTime)
      },
      vel: {
        x: this.deltaVelocity(acc.x, deltaTime),
        y: this.deltaVelocity(acc.y, deltaTime)
      }
    };
  };

  this.update = function(deltaTime) {
    var diff = this.accelerationEffect(this.acc, deltaTime);
    if (diff.pos.x != 0 || diff.pos.y != 0) {
      var diffVec = Lib.Geometry.truncate(diff.pos, this.maxVelocity()*deltaTime);
      this.position({x: this.x() + diffVec.x, y: this.y() + diffVec.y});
    }

    this.vel.x += diff.vel.x;
    this.vel.y += diff.vel.y;

    this.truncateVelocity();
  };

  this.truncateVelocity = function() {
    this.vel = Lib.Geometry.truncate(this.vel, this.maxVelocity());
  };

  this.truncateAcceleration = function() {
    this.acc = Lib.Geometry.truncate(this.acc, this.maxAcceleration());
  };

  this.applyForce = function(force, deltaTime) {
    var f = Lib.Geometry.fromVector(force);
    var accDiff = Lib.Geometry.toVector(f.direction, (f.module / this.weight)*deltaTime);
    this.acc.x += accDiff.x;
    this.acc.y += accDiff.y;
    this.truncateAcceleration();
  };

  this.applyFrictionForce = function(force, deltaTime) {
    this.applyVelocityFrictionForce(force, deltaTime)
    this.applyAccelerationFrictionForce(force, deltaTime)
  };

  this.applyAccelerationFrictionForce = function(force, deltaTime, minAccModule) {
    var minAccModule = minAccModule || 0;
    var frictionModule = (force / this.weight) * deltaTime;

    if(this.acc.x != 0 || this.acc.y != 0) {
      var accFrictionDirection = (Lib.Geometry.angle(this.acc) + 360 + 180) % 360;
      var accFriction = Lib.Geometry.toVector(accFrictionDirection, frictionModule);
      var minAcc = Lib.Geometry.toVector(Lib.Geometry.angle(this.acc), minAccModule);

      this.acc.x = Lib.Math.sumToMin(this.acc.x, accFriction.x, Math.abs(minAcc.x));
      this.acc.y = Lib.Math.sumToMin(this.acc.y, accFriction.y, Math.abs(minAcc.y));
    }
  }

  this.applyVelocityFrictionForce = function(force, deltaTime, minVelModule) {
    var minVelModule = minVelModule || 0;
    var frictionModule = (force / this.weight) * deltaTime;

    if(this.vel.x != 0 || this.vel.y != 0) {
      var velFrictionDirection = (Lib.Geometry.angle(this.vel) + 360 + 180) % 360;
      var velFriction = Lib.Geometry.toVector(velFrictionDirection, frictionModule);
      var diff = this.accelerationEffect(velFriction, deltaTime);
      var minVel = Lib.Geometry.toVector(Lib.Geometry.angle(this.vel), minVelModule);

      this.vel.x = Lib.Math.sumToMin(this.vel.x, diff.vel.x, Math.abs(minVel.x));
      this.vel.y = Lib.Math.sumToMin(this.vel.y, diff.vel.y, Math.abs(minVel.y));
    }
  };

  this.topLeftCorner = function() {
    return {x: this.x() - this.size().width/2, y: this.y() - this.size().height/2};
  };

  this.bottomRightCorner = function() {
    return {x: this.x() + this.size().width/2, y: this.y() + this.size().height/2};
  };

  this.hasCollided = function(obj2) {
    var topLeftCorner1 =     this.topLeftCorner();
    var bottomRightCorner1 = this.bottomRightCorner();
    var topLeftCorner2 =     obj2.topLeftCorner();
    var bottomRightCorner2 = obj2.bottomRightCorner();

    var obj2IsAbove = bottomRightCorner2.y < topLeftCorner1.y;
    var obj2IsBelow = bottomRightCorner1.y < topLeftCorner2.y;
    var obj2IsAtLeft = bottomRightCorner2.x < topLeftCorner1.x;
    var obj2IsAtRight = bottomRightCorner1.x < topLeftCorner2.x;

    var noCollision = obj2IsAbove || obj2IsBelow || obj2IsAtLeft || obj2IsAtRight;

    return !noCollision;
  };

  this.destroy = function() {
    this.destroyed = true;
  };

  this.wasDestroyed = function() {
    return this.destroyed;
  };

  this.isSolid = function() {
    return this.solid;
  };
};
