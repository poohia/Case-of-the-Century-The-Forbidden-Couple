export const isArrayWithEqualEntries = <T = any>(array: T[]): boolean =>
  new Set(array).size === 1;

export const calculPercent = (val1: number, val2: number) =>
  (val1 * 100) / val2;
