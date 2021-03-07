import { ts } from "./t2";
export const check = (a: number) => {
  if (ts()) return a > 0;
  return a < 0;
};
