Lib.Geometry = {
  angle: function(v) {
    var relAngle = Math.atan(v.y/v.x) / Math.PI * 180;
    if(v.x < 0) {
      relAngle += 180;
    } else if(v.y < 0) {
      relAngle += 360;
    }
    return relAngle;
  },

  angleBetween: function(v1, v2) {
    return this.angle(v1) - this.angle(v2);
  },

  turn: function(vector, degrees) {
    var vAbs = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
    var vAngle = this.angle(vector);
    var newAngle = (vAngle + degrees) % 360;
    return this.toVector(newAngle, vAbs);
  },

  toVector: function(direction, size) {
    return {
      x: size*Math.cos(direction/180.0*Math.PI),
      y: size*Math.sin(direction/180.0*Math.PI)
    };
  }
};
