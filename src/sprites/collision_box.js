Sprites.CollisionBox = (function() {
  var COLORS = [cc.color(255,0,0,128), cc.color(0,255,0,128), cc.color(0,0,255,128), cc.color(0,255,255,128), cc.color(255,255,0,128)];
  var M = function(body) {
    this.body = body;
    this.rect = cc.DrawNode.create();

    var colorI = Math.floor(Math.random(new Date())*5);
    this.colorI = colorI;
  };

  M._boxes = [];

  M.createFor = function(body) {
    this._boxes.push(new M(body));
  };

  M.addAllTo = function(component, priority) {
    var priority = priority || 100;
    for(var i = 0; i<this._boxes.length; i++) {
      component.addChild(this._boxes[i].rect, priority);
    }  
  };

  M.update = function() {
    var newBoxes = [];
    for(var i = 0; i<this._boxes.length; i++) {
      if(this._boxes[i].update()) {
        newBoxes.push(this._boxes[i]);
      }
    }
    this._boxes = newBoxes;
  };

  M.prototype.update = function() {
    if(this.body.wasDestroyed()) {
      this.rect.removeFromParent();
      return false;
    } else {
      var body = this.body;
      this.rect.setPosition(body.x(), body.y());
      this.rect.clear();
      this.rect.setPosition(body.x(), body.y());
      this.rect.drawRect(new cc.Point(-body.width/2,-body.height/2), new cc.Point(body.width/2,body.height/2),
                              COLORS[this.colorI], 3, COLORS[(this.colorI+1)%COLORS.length]);
      return true;
    }
  };

  return M;
}());
