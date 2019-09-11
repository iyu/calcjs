/**
 * CalcJs
 * @name calcjs.js
 * @author Yuhei Aihara <yu.e.yu.4119@gmail.com>
 * @license MIT License
 */

const VERSION = "0.0.8";

const calcDigit = (list: number[]) => {
  let result = 0;
  for (const num of list) {
    const str = num.toExponential();
    const match = str.match(/^\d(?:\.(\d+))?e([\+\-])(\d+)$/);
    let ret = match && match[1] && match[1].length || 0;
    if (match && match[2] === "+") {
      ret -= Number(match[3]);
    } else if (match) {
      ret += Number(match[3]);
    }
    if (result < ret) {
      result = ret;
    }
  }

  return Math.pow(10, result);
};

const toUpperDigit = (num: number, digit: number) => {
  return Math.round(num * digit);
};

class Chain {
  private nums: number[];
  private operators: Array<"add" | "sub" | "multi" | "div"> = [];

  constructor(num: number) {
    this.nums = [num];
  }

  public add(num: number) {
    this.operators.push("add");
    this.nums.push(num);
    return this;
  }

  public sub(num: number) {
    this.operators.push("sub");
    this.nums.push(num);
    return this;
  }

  public multi(num: number) {
    this.operators.push("multi");
    this.nums.push(num);
    return this;
  }

  public div(num: number) {
    this.operators.push("div");
    this.nums.push(num);
    return this;
  }

  public end() {
    let digit = calcDigit(this.nums);

    let indexMulti = this.operators.indexOf("multi");
    let indexDiv = this.operators.indexOf("div");
    while (indexMulti >= 0 || indexDiv >= 0) {
      let nextIndex;
      let ret;
      if (indexMulti >= 0 && (indexDiv < 0 || indexMulti < indexDiv)) {
        nextIndex = indexMulti + 1;
        ret = toUpperDigit(this.nums[indexMulti], digit) *
          toUpperDigit(this.nums[nextIndex], digit) /
          (digit * digit);
        this.nums.splice(indexMulti, 2, ret);
        this.operators.splice(indexMulti, 1);
      } else if (indexDiv >= 0) {
        nextIndex = indexDiv + 1;
        ret = this.nums[indexDiv] / this.nums[nextIndex];
        this.nums.splice(indexDiv, 2, ret);
        this.operators.splice(indexDiv, 1);
      }

      indexMulti = this.operators.indexOf("multi");
      indexDiv = this.operators.indexOf("div");
      digit = calcDigit(this.nums);
    }

    digit = calcDigit(this.nums);
    let result = this.nums[0];
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] === "add") {
        result = (toUpperDigit(result, digit) + toUpperDigit(this.nums[i + 1], digit)) / digit;
      } else {
        result = (toUpperDigit(result, digit) - toUpperDigit(this.nums[i + 1], digit)) / digit;
      }
    }

    this.nums = [];
    this.operators = [];
    return result;
  }
}

class CalcJs {
  public readonly VERSION = VERSION;

  public add(...args: number[]) {
    const digit = calcDigit(args);
    let result = toUpperDigit(args[0], digit) || 0;
    for (let i = 1; i < args.length; i++) {
      result += toUpperDigit(args[i], digit);
    }
    return result / digit;
  }

  public sub(...args: number[]) {
    const digit = calcDigit(args);
    let result = toUpperDigit(args[0], digit) || 0;
    for (let i = 1; i < args.length; i++) {
      result -= toUpperDigit(args[i], digit);
    }
    return result / digit;
  }

  public multi(...args: number[]) {
    const digit = calcDigit(args);
    let result = toUpperDigit(args[0], digit) || 0;
    for (let i = 1; i < args.length; i++) {
      result *= toUpperDigit(args[i], digit);
    }
    return result / Math.pow(digit, args.length);
  }

  public div(...args: number[]) {
    let result = args[0] || 0;
    for (let i = 1; i < args.length; i++) {
      result /= args[i];
    }
    return result;
  }

  public begin(num: number) {
    return new Chain(num);
  }
}

export = new CalcJs();
