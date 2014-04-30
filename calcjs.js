/**
 * CalcJs
 * @name calcjs.js
 * @author Yuhei Aihara <aihara_yuhei2cyberagent.co.jp>
 * @license MIT License
 */
(function() {

  var root = this;

  var previousCalcJs = root.calcjs;
  
  var version = '0.0.2';
  
  function digit(list) {
    var result = 0;
    for (var i = 0; i < list.length; i++) {
      var str = list[i].toString();
      var index = str.indexOf('.');
      var ret = ~index ? str.length - index - 1 : 0;
      if (result < ret) {
        result = ret;
      }
    }
  
    return result;
  }
  
  function _CalcJs(num) {
    this.nums = [num];
    this.operators = [];
  }
  
  _CalcJs.prototype.add = function(num) {
    this.operators.push('add');
    this.nums.push(num);
    return this;
  };
  
  _CalcJs.prototype.sub = function(num) {
    this.operators.push('sub');
    this.nums.push(num);
    return this;
  };
  
  _CalcJs.prototype.multi = function(num) {
    this.operators.push('multi');
    this.nums.push(num);
    return this;
  };
  
  _CalcJs.prototype.div = function(num) {
    this.operators.push('div');
    this.nums.push(num);
    return this;
  };
  
  _CalcJs.prototype.end = function() {
    var _digit = Math.pow(10, digit(this.nums));
  
    var indexMulti = this.operators.indexOf('multi');
    var indexDiv = this.operators.indexOf('div');
    while(~indexMulti || ~indexDiv) {
      var nextIndex, ret;
      if (~indexMulti && (!~indexDiv || indexMulti < indexDiv)) {
        nextIndex = indexMulti + 1;
        ret = (this.nums[indexMulti] * _digit) * (this.nums[nextIndex] * _digit) / (_digit * _digit);
        this.nums.splice(indexMulti, 2, ret);
        this.operators.splice(indexMulti, 1);
      } else if (~indexDiv) {
        nextIndex = indexDiv + 1;
        ret = this.nums[indexDiv] / this.nums[nextIndex];
        this.nums.splice(indexDiv, 2, ret);
        this.operators.splice(indexDiv, 1);
      }
  
      indexMulti = this.operators.indexOf('multi');
      indexDiv = this.operators.indexOf('div');
    }
  
    var result = this.nums[0];
    for (var i = 0; i < this.operators.length; i++) {
      if (this.operators[i] === 'add') {
        result = (result * _digit + this.nums[i + 1] * _digit) / _digit;
      } else {
        result = (result * _digit - this.nums[i + 1] * _digit) / _digit;
      }
    }
  
    this.nums = [];
    this.operators = [];
    return result;
  };
  
  
  function CalcJs() {
    this.version = version;
  }
  
  CalcJs.prototype.add = function() {
    var _digit = Math.pow(10, digit(arguments));
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
      result += arguments[i] * _digit;
    }
    return result / _digit;
  };
  
  CalcJs.prototype.sub = function() {
    var _digit = Math.pow(10, digit(arguments));
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
      result -= arguments[i] * _digit;
    }
    return result / _digit;
  };
  
  CalcJs.prototype.multi = function() {
    var _digit = Math.pow(10, digit(arguments));
    var result = 1;
    for (var i = 0; i < arguments.length; i++) {
      result *= arguments[i] * _digit;
    }
    return result / Math.pow(_digit, arguments.length);
  };
  
  CalcJs.prototype.div = function() {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      result /= arguments[i];
    }
    return result;
  };
  
  CalcJs.prototype.begin = function(num) {
    return new _CalcJs(num);
  };
  
  CalcJs.prototype.noConflict = function() {
    root.calcjs = previousCalcJs;
    return this;
  };

  var calcjs = new CalcJs();
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = calcjs;
    } else {
      exports = calcjs;
    }
  } else {
    root.calcjs = calcjs;
  }
}.call(this));

