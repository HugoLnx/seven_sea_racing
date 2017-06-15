Model.Controls = (function() {
  var KEYS = {
    "esc" : 27,
    "ctrl" : 17,
    "space" : 32,
    "enter" : 13,
    "a" : 65,
  };
  var M = function(sprite) {
    var controls = this;
    this.touchPosition = null;
    this.doubleTouch = null;
    this.lastTouchTimestamp = null;
    this.keysPressing = {};
    this.mousePosition = null;
    this.listener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function(touch, event) {
        controls.onTouch(touch.getLocationX(), touch.getLocationY());
        return true;
      },
      onTouchMoved: function(touch, event) {
        controls.onTouchUpdate(touch.getLocationX(), touch.getLocationY());
        return true;
      },
      onTouchEnded: function(touch, event) {
        controls.onTouchLeave();
      }
    });
    cc.eventManager.addListener(this.listener, sprite);

    if( 'keyboard' in cc.sys.capabilities ) {
      var listener = cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(key, event) {
          controls.keysPressing[key] = true;
        },
        onKeyReleased: function(key, event) {
          controls.keysPressing[key] = false;
        },
      });
      cc.eventManager.addListener(listener, sprite);
    }

    if( 'mouse' in cc.sys.capabilities ) {
      var listener = cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseMove: function(event) {
          controls.mousePosition = event.getLocation();
        }
      });
      cc.eventManager.addListener(listener, sprite);
    }

    this.onTouch = function(x, y) {
      var timestamp = new Date().getTime();
      this.touchPosition = {x: x, y: y};
      if(timestamp - this.lastTouchTimestamp < 500) {
        this.doubleTouch = {position: {x: x, y: y}, timestamp: timestamp};
        var self = this;
        cc.director.getScheduler().scheduleCallbackForTarget(sprite, function() {
          self.clearDoubleTouching();
        }, 1, 0);
      }
      this.lastTouchTimestamp = timestamp;
    };

    this.onTouchUpdate = function(x, y) {
      this.touchPosition = {x: x, y: y};
      if(this.doubleTouch !== null) {
        this.doubleTouch.position = {x: x, y: y};
      }
    }

    this.onTouchLeave = function() {
      this.touchPosition = null;
      this.doubleTouch = null;
    };

    this.touching = function() {
      return this.touchPosition;
    };

    this.doubleTouching = function() {
      return this.doubleTouch && this.doubleTouch.position;
    };

    this.clearDoubleTouching = function() {
      this.doubleTouch = null;
    };

    this.pressing = function(keyname) {
      return this.keysPressing[KEYS[keyname]];
    };

    this.mouse = function() {
      return this.mousePosition;
    };
  };

  M.instance = function(sprite) {
    if(M.currentInstance === undefined)
      M.currentInstance = new M(sprite);
    return M.currentInstance;
  };

  M.resetInstance = function() {
    M.currentInstance = undefined;
  };

  return M;
}());
