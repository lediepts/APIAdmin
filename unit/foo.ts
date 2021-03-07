import { check } from "./ut";

export function sum(a: number, b: number) {
  if (check(a)) return a + b;
  return b-1;
}
