import { RetrospaceadventureElements } from "./types";

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
