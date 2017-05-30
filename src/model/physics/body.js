Model.Physics.Body = function(width, height, isSolid, weight) {
  this.acc = {x: 0, y: 0};
  this.vel = {x: 0, y: 0};
  this.pos = {x: 0, y: 0};
  this.width = width;
  this.height = height;
  this.isSolid = isSolid;
  this.weight = weight;
  this.maxAcc = 1000000000;
  this.maxVel = 1000000000;

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
      this.pos.x += diffVec.x;
      this.pos.y += diffVec.y;

      var maxY = 905;
      var minY = -579;
      var maxX = 1622;
      var minX = -1140;

      if(this.pos.x < minX) {
        this.pos.x = minX;
        this.acc.x = 0;
        this.vel.x = 0;
      }
      if(this.pos.x > maxX) {
        this.pos.x = maxX;
        this.acc.x = 0;
        this.vel.x = 0;
      }
      if(this.pos.y < minY) {
        this.pos.y = minY;
        this.acc.y = 0;
        this.vel.y = 0;
      }
      if(this.pos.y > maxY) {
        this.pos.y = maxY;
        this.acc.y = 0;
        this.vel.y = 0;
      }
      console.log(this.pos);
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
    var frictionModule = (force / this.weight) * deltaTime;

    if(this.vel.x != 0 || this.vel.y != 0) {
      var velFrictionDirection = (Lib.Geometry.angle(this.vel) + 360 + 180) % 360;
      var velFriction = Lib.Geometry.toVector(velFrictionDirection, frictionModule);
      var diff = this.accelerationEffect(velFriction, deltaTime);

      this.vel.x = Lib.Math.sumToZeroMax(this.vel.x, diff.vel.x);
      this.vel.y = Lib.Math.sumToZeroMax(this.vel.y, diff.vel.y);
    }


    if(this.acc.x != 0 || this.acc.y != 0) {
      var accFrictionDirection = (Lib.Geometry.angle(this.acc) + 360 + 180) % 360;
      var accFriction = Lib.Geometry.toVector(accFrictionDirection, frictionModule);
      this.acc.x = Lib.Math.sumToZeroMax(this.acc.x, accFriction.x);
      this.acc.y = Lib.Math.sumToZeroMax(this.acc.y, accFriction.y);
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
};
