import { sum } from "../unit/foo";
import {check} from "../unit/ut"
// jest.mock("../unit/foo");
jest.mock("../unit/ut");

// const Sum = sum as jest.Mock;
const Check = check as jest.Mock;

// test("adds 1 + 2 to equal 3", () => {
//   sum(4,2)
//   expect(sum(4, 2)).toBe(6);
// });
test("hoge", () => {
  sum(4, 2);
  expect(Check.mock.calls[0][0]).toBe(4);
});
