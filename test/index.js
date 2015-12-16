var should = require('should');

var calcjs = require('../calcjs');

describe('#add', function() {
  it('calcjs.add(0.1, 0.1, 0.1) > 0.3', function() {
    var result = calcjs.add(0.1, 0.1, 0.1);
    result.should.equal(0.3);
  });
});

describe('#sub', function() {
  it('calcjs.sub(0.3, 0.1, 0.1) > 0.1', function() {
    var result = calcjs.sub(0.3, 0.1, 0.1);
    result.should.equal(0.1);
  });
});

describe('#multi', function() {
  it('calcjs.multi(0.1, 0.1, 0.1) > 0.001', function() {
    var result = calcjs.multi(0.1, 0.1, 0.1);
    result.should.equal(0.001);
  });
  it('calcjs.multi(0.55, 100) > 55', function() {
    var result = calcjs.multi(0.55, 100);
    result.should.equal(55);
  });
  it('calcjs.multi(0.00000000123, 100) > 1.23e-7', function() {
    var result = calcjs.multi(0.00000000123, 100);
    result.should.equal(0.000000123);
  });
  it('calcjs.multi(0.0000001, 10) > 0.000001', function() {
    var result = calcjs.multi(0.0000001, 10);
    result.should.equal(0.000001);
  });
});

describe('#div', function() {
  it('calcjs.div(10, 5, 2) > 1', function() {
    var result = calcjs.div(10, 5, 2);
    result.should.equal(1);
  });
});

describe('chain', function() {
  it('calcjs.begin(0.1).add(0.2).multi(0.1).end() > 0.12', function() {
    var result = calcjs.begin(0.1).add(0.2).multi(0.1).end();
    result.should.equal(0.12);
  });
});
