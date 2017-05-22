Lib.Math = {
  sumToZeroMax: function(e1, e2) {
    var e1Signal = -1;
    if(e1 >= 0) e1Signal = 1;

    var result = e1 + e2;
    var resultSignal = -1;
    if(result >= 0) resultSignal = 1;

    if(e1Signal != resultSignal) return 0;
    else return result;
  }
};
