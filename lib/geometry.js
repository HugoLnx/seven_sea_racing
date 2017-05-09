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

  toVector: function(direction, size) {
    return {
      x: size*Math.cos(direction/180.0*Math.PI),
      y: size*Math.sin(direction/180.0*Math.PI)
    };
  }
};
