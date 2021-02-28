import { sum } from "../lib/checkAPIKey";

const str = [
  [1, 2, 3],
  [2, 4, 6],
];
// `
//   a    | b    | expected
//   ${1} | ${2} | ${3}
//   ${3} | ${2} | ${5}
//   ${6} | ${2} | ${8}
// `;

describe.each(str)("test sum", (a, b, expected) => {
  test(`${a} + ${b} = ${expected}`, () => {
    expect(sum(a, b)).toBe(expected);
  });
});

describe.only.each([
  [1, 1, 2],
  [5, 3, 8],
  [2, 1, 3],
])(`hoge $b`, (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });
});

test("will not be ran", () => {
  expect(1 / 0).toBe(Infinity);
});