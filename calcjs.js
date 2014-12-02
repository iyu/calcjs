/**
 * CalcJs
 * @name calcjs.js
 * @author Yuhei Aihara <aihara_yuhei2cyberagent.co.jp>
 * @license MIT License
 */
(function() {

  var root = this;

  var previousCalcJs = root.calcjs;
  
  var version = '0.0.3';
  
  function calcDigit(list) {
    var result = 0;
    for (var i = 0; i < list.length; i++) {
      var str = list[i].toString();
      var index = str.indexOf('.');
      var ret = ~index ? str.length - index - 1 : 0;
      if (result < ret) {
        result = ret;
      }
    }
  
    return Math.pow(10, result);
  }

  function toUpperDigit(num, digit) {
    return Math.round(num * digit);
  }
  
  function Chain(num) {
    this.nums = [num];
    this.operators = [];
  }
  
  Chain.prototype.add = function(num) {
    this.operators.push('add');
    this.nums.push(num);
    return this;
  };
  
  Chain.prototype.sub = function(num) {
    this.operators.push('sub');
    this.nums.push(num);
    return this;
  };
  
  Chain.prototype.multi = function(num) {
    this.operators.push('multi');
    this.nums.push(num);
    return this;
  };
  
  Chain.prototype.div = function(num) {
    this.operators.push('div');
    this.nums.push(num);
    return this;
  };
  
  Chain.prototype.end = function() {
    var digit = calcDigit(this.nums);
  
    var indexMulti = this.operators.indexOf('multi');
    var indexDiv = this.operators.indexOf('div');
    while(~indexMulti || ~indexDiv) {
      var nextIndex, ret;
      if (~indexMulti && (!~indexDiv || indexMulti < indexDiv)) {
        nextIndex = indexMulti + 1;
        ret = toUpperDigit(this.nums[indexMulti], digit) * toUpperDigit(this.nums[nextIndex], digit) / (digit * digit);
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
      digit = calcDigit(this.nums);
    }
  
    digit = calcDigit(this.nums);
    var result = this.nums[0];
    for (var i = 0; i < this.operators.length; i++) {
      if (this.operators[i] === 'add') {
        result = (toUpperDigit(result, digit) + toUpperDigit(this.nums[i + 1], digit)) / digit;
      } else {
        result = (toUpperDigit(result, digit) - toUpperDigit(this.nums[i + 1], digit)) / digit;
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
    var digit = calcDigit(arguments);
    var result = toUpperDigit(arguments[0], digit) || 0;
    for (var i = 1; i < arguments.length; i++) {
      result += toUpperDigit(arguments[i], digit);
    }
    return result / digit;
  };
  
  CalcJs.prototype.sub = function() {
    var digit = calcDigit(arguments);
    var result = toUpperDigit(arguments[0], digit) || 0;
    for (var i = 1; i < arguments.length; i++) {
      result -= toUpperDigit(arguments[i], digit);
    }
    return result / digit;
  };
  
  CalcJs.prototype.multi = function() {
    var digit = calcDigit(arguments);
    var result = toUpperDigit(arguments[0], digit) || 0;
    for (var i = 1; i < arguments.length; i++) {
      result *= toUpperDigit(arguments[i], digit);
    }
    return result / Math.pow(digit, arguments.length);
  };
  
  CalcJs.prototype.div = function() {
    var result = arguments[0] || 0;
    for (var i = 1; i < arguments.length; i++) {
      result /= arguments[i];
    }
    return result;
  };
  
  CalcJs.prototype.begin = function(num) {
    return new Chain(num);
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

