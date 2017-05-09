Model.Physics.Universe = (function() {
  var M = function() {
    this.bodies = [];

    this.update = function() {
      for(var i = 0; i<this.bodies.length; i++) {
        var body = this.bodies[i];
        body.update();
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
