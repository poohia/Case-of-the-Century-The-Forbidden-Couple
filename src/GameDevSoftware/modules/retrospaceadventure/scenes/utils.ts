import { RetrospaceadventureElements } from "./types";

export const randomFromArray = <T = any>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

export const isArrayWithEqualEntries = <T = any>(array: T[]): boolean =>
  new Set(array).size === 1;

export const calculPercent = (val1: number, val2: number) =>
  (val1 * 100) / val2;

export const defineHeroWinElementChoice = (
  elementChoiceHero: RetrospaceadventureElements,
  elementChoiceEnemy: RetrospaceadventureElements
): "win" | "draw" | "loose" => {
  if (elementChoiceHero === elementChoiceEnemy) {
    return "draw";
  }
  if (
    (elementChoiceHero === 1 && elementChoiceEnemy === 2) ||
    (elementChoiceHero === 2 && elementChoiceEnemy === 3) ||
    (elementChoiceHero === 3 && elementChoiceEnemy === 1)
  ) {
    return "win";
  }
  return "loose";
};
