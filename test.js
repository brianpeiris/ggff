const test = require("ava");
const { generateId } = require("./src/utils.js");

test("generateId", t => {
  const id = generateId(10);
  t.is(id.length, 2);
});

test("generateId2", t => {
  const id = generateId(50);
  t.is(id.length, 2);
});

test("generateId3", t => {
  const id = generateId(100);
  t.is(id.length, 3);
});
