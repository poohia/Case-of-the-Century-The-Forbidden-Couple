export const randomFromArray = <T = any>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

export const isArrayWithEqualEntries = (array: any[]): boolean =>
  new Set(array).size === 1;

export const calculPercent = (val1: number, val2: number) =>
  (val1 * 100) / val2;

export const shuffleArray = <T = any>(array: T[]): T[] => {
  let i, j, tmp;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
};
