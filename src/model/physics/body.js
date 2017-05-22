Model.Physics.Body = function(width, height, isSolid, weight) {
  this.acc = {x: 0, y: 0};
  this.vel = {x: 0, y: 0};
  this.pos = {x: 0, y: 0};
  this.width = width;
  this.height = height;
  this.isSolid = isSolid;
  this.weight = weight;
  this.maxAcc = 3;
  this.maxVel = 10;

  this.x = function(){ return this.position().x; };
  this.y = function(){ return this.position().y; };

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

  this.update = function() {
    this.incrementVelocity(this.acc);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  this.incrementAcceleration = function(v) {
    this.acc.x += v.x;
    this.acc.y += v.y;
    this.truncateAcceleration();
  };

  this.incrementVelocity = function(v) {
    this.vel.x += v.x;
    this.vel.y += v.y;
    this.truncateVelocity();
  };

  this.truncateVelocity = function() {
    this.vel = Lib.Geometry.truncate(this.vel, this.maxVelocity());
  };

  this.truncateAcceleration = function() {
    this.acc = Lib.Geometry.truncate(this.acc, this.maxAcceleration());
  };

  this.applyForce = function(force) {
    var f = Lib.Geometry.fromVector(force);
    var accDiff = Lib.Geometry.toVector(f.direction, f.module / this.weight);
    this.incrementAcceleration(accDiff);
  };

  this.applyFrictionForce = function(force) {
    var acc = force / this.weight;
    if(this.vel.x != 0 || this.vel.y != 0) {
      var velDirection = Lib.Geometry.angle(this.vel);
      var velModule = Lib.Geometry.module(this.vel);

      var newVelModule = Math.max(velModule - Math.sqrt(acc), 0);
      this.vel = Lib.Geometry.toVector(velDirection, newVelModule);
      this.truncateVelocity();
    }

    if(this.acc.x != 0 || this.acc.y != 0) {
      var accDirection = Lib.Geometry.angle(this.acc);
      var accModule = Lib.Geometry.module(this.acc);

      var newAccModule = Math.max(accModule - acc, 0);
      this.acc = Lib.Geometry.toVector(accDirection, newAccModule);
      this.truncateAcceleration();
    }
  };

  this.topLeftCorner = function() {
    return {x: this.x() - this.size().width/2, y: this.y() - this.size().height/2};
  };

  this.bottomRightCorner = function() {
    return {x: this.x() + this.size().width/2, y: this.y() + this.size().height/2};
  };

  this.collides = function(obj2) {
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
};
