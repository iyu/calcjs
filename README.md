CalcJs
==========

Auxiliary arithmetic library. 

More accurately, and more quickly.

```
> 0.55 * 100
55.00000000000001
> calcjs.multi(0.55, 100)
55

> 0.1 + 0.1 + 0.1
0.30000000000000004
> calcjs.add(0.1, 0.1, 0.1)
0.3

> 0.00000000123 * 100
1.23e-7
> calcjs.multi(0.00000000123, 100)
1.23e-7

> 0.1 + 0.2 * 0.1
0.12000000000000001
> calcjs.begin(0.1).add(0.2).multi(0.1).end()
0.12
```

## Installation
In browser:
```
<script src="calcjs.js"></script>
<script>
  (function() {
    var calcjs = window.calcjs;
    // using calcjs
  }());
</script>
```

In an AMD loader:
```
require(['calcjs'], function(calcjs) {
  // using calcjs
});
```

Using `npm`:
```
npm install --save calcjs
```

In Node.js:
```
var calcjs = require('calcjs');
// using calcjs
```

## Usage
```
// Addition
// 0.1 + 0.1 + 0.1
calcjs.add(0.1, 0.1, 0.1)
// return 0.3

// Subtraction
// 0.3 - 0.1 - 0.1
calcjs.sub(0.3, 0.1, 0.1)
// return 0.1

// Multiplication
// 0.1 * 0.1 * 0.1
calcjs.multi(0.1, 0.1, 0.1)
// return 0.001

// Division
// 10 / 5 / 2
calcjs.div(10, 5, 2)
// return 1


// Chain
// 0.1 + 0.2 * 0.1
calcjs.begin(0.1).add(0.2).multi(0.1).end()
// return 0.12
```

## Contribution
1. Fork it ( https://github.com/iyu/calcjs/fork )
2. Create a feature branch
3. Commit your changes
4. Rebase your local changes against the master branch
5. Run test suite with the `npm test; npm run lint` command and confirm that it passes
5. Create new Pull Request
