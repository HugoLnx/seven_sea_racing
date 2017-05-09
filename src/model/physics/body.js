Model.Physics.Body = function(width, height, isSolid, weight) {
  this.vel = {x: 0, y: 0};
  this.pos = {x: 0, y: 0};
  this.width = width;
  this.height = height;
  this.isSolid = isSolid;
  this.weight = weight;

  this.x = function(){ return this.position().x; };
  this.y = function(){ return this.position().y; };

  this.attachTo = function(raceObject) {
    this.related = raceObject;
  };

  this.position = function(value) {
    if(value === undefined) return this.pos;
    else this.pos = value;
  }

  this.velocity = function(value) {
    if(value === undefined) return this.vel;
    else this.vel = value;
  };

  this.direction = function() {
    return Lib.Geometry.angle(this.vel);
  };

  this.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };
};
