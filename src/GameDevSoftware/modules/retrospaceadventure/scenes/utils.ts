export const isArrayWithEqualEntries = <T = any>(array: T[]): boolean =>
  new Set(array).size === 1;
