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
