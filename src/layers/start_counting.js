Layers.StartCounting = (function() {
  var M = cc.Layer.extend({
    counting: 3,
    sizeScale: 0,
    finished: false,
    onFinishBehaviour: null,
    init: function() {
      this._super();
      this.label = new Sprites.RegularLabel(250);
      this.label.setPosition(cc.winSize.width/2, cc.winSize.height/2);
      this.updateLabel();
      this.addChild(this.label);
    },
    onFinish: function(onFinishBehaviour) {
      this.onFinishBehaviour = onFinishBehaviour;
      if(this.finished) onFinishBehaviour();
    },
    scheduleIncrement: function() {
      var self = this;
      cc.director.getScheduler().scheduleCallbackForTarget(this.label, function() {
        self.counting -= 1;
        self.sizeScale = 0;
        self.label.setScale(0);
        self.updateLabel();
        if(self.counting === 0) {
          self.scheduleIncrement();
        } else if (self.counting > 0) {
          self.scheduleIncrement();
        } else {
          self.onFinishBehaviour && self.onFinishBehaviour();
        }
      }, 1, 0);
    },
    updateLabel: function() {
      if (this.counting > 0) {
        this.label.setString(this.counting);
      } else if (this.counting === 0) {
        this.label.setString("GO!");
      } else {
        this.label.setString("");
      }
    },
    update: function(dt) {
      this.sizeScale = Math.min(1, this.sizeScale + dt*1.5);
      this.label.setScale(this.sizeScale);
      this.label.setOpacity(Math.min(255, this.sizeScale/1.5*350));
    }
  });

  return M;
}());
