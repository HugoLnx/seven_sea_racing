Lib.Math = {
  sumToMin: function(e1, e2, min) {
    if(e1 >= 0) var e1Signal = 1;
    else var e1Signal = -1;

    var result = e1 + e2;
    if(result >= 0) var resultSignal = 1;
    else var resultSignal = -1;

    if((result >= min*-1 && result <= min) || resultSignal !== e1Signal) return min*e1Signal;
    else return result;
  },

  // {elementSize: {width: 0, height: 0}, frameSize: {width: 0, height: 0}}
  expandInFrame: function(parameters) {
    var elementSize = parameters.elementSize;
    var frameSize = parameters.frameSize;
    var scaleOnWidth = frameSize.width / elementSize.width;
    var scaleOnHeight = frameSize.height / elementSize.height;

    if(scaleOnWidth > scaleOnHeight) {
      var cropOrientation = "height";
    } else {
      var cropOrientation = "width";
    }

    return this.fitInFrame({elementSize: elementSize, frameSize: frameSize, cropOrientation: cropOrientation});
  },

  // {elementSize: {width: 0, height: 0}, frameSize: {width: 0, height: 0}, cropOrientation: ("width"/"height")}
  fitInFrame: function(parameters) {
    var elementSize = parameters.elementSize;
    var frameSize = parameters.frameSize;
    var cropOnHeight = parameters.cropOrientation !== "width";
    var cropOrientation = (cropOnHeight ? "height" : "width");
    var resizeOrientation = (cropOnHeight ? "width" : "height");
    var scale = frameSize[resizeOrientation] / elementSize[resizeOrientation];
    
    var newSize = {};
    newSize[resizeOrientation] = frameSize[resizeOrientation];
    newSize[cropOrientation] = elementSize[cropOrientation] * scale;
    return {
      size: newSize,
      scale: scale
    }
  }
};
