import booleanTree from "../src/index";

booleanTree.init([
  { a: 1 },
  "c",
  2,
  null,
  { f: undefined },
  undefined,
  { g: null },
  [null, true, "hi", 0],
  [{ h: 0 }, { i: 1 }],
]);

const arr = booleanTree.tree();
console.log(arr[3]);

booleanTree.falsies();

booleanTree.truthies();
