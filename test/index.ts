import anyTest, { TestInterface } from "ava";

import calcjs from "../calcjs";

const test = anyTest as TestInterface<{}>;

test("#add calcjs.add(0.1, 0.1, 0.1) > 0.3", (t) => {
  const result = calcjs.add(0.1, 0.1, 0.1);
  t.is(result, 0.3);
});

test("#sub calcjs.sub(0.3, 0.1, 0.1) > 0.1", (t) => {
  const result = calcjs.sub(0.3, 0.1, 0.1);
  t.is(result, 0.1);
});

test("#multi calcjs.multi(0.1, 0.1, 0.1) > 0.001", (t) => {
  const result = calcjs.multi(0.1, 0.1, 0.1);
  t.is(result, 0.001);
});
test("#multi calcjs.multi(0.55, 100) > 55", (t) => {
  const result = calcjs.multi(0.55, 100);
  t.is(result, 55);
});
test("#multi calcjs.multi(0.00000000123, 100) > 1.23e-7", (t) => {
  const result = calcjs.multi(0.00000000123, 100);
  t.is(result, 0.000000123);
});
test("#multi calcjs.multi(0.0000001, 10) > 0.000001", (t) => {
  const result = calcjs.multi(0.0000001, 10);
  t.is(result, 0.000001);
});

test("#div calcjs.div(10, 5, 2) > 1", (t) => {
  const result = calcjs.div(10, 5, 2);
  t.is(result, 1);
});

test("#chain calcjs.begin(0.1).add(0.2).multi(0.1).end() > 0.12", (t) => {
  const result = calcjs.begin(0.1).add(0.2).multi(0.1).end();
  t.is(result, 0.12);
});
