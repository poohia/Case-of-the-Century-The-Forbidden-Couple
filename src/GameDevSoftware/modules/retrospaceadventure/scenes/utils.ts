import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
} from "./types";

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

export const generateRandomCard = (cards: RetrospaceadventureCard[]) =>
  cards[Math.floor(Math.random() * cards.length)];

export const drawCardByEffect = (
  cards: RetrospaceadventureCard[],
  effect: RetrospaceadventureCardEffect
) => {
  return (
    cards.find((card) => card.critical_effect.effect === effect) ||
    generateRandomCard(cards)
  );
};

export const mapCardEffect = (cards: RetrospaceadventureCard[]) =>
  cards.map((card) => card.critical_effect.effect);

export const updateBoxContainer = (
  refParentContainer: React.RefObject<HTMLSpanElement>,
  from: React.RefObject<SVGPathElement>,
  to: React.RefObject<HTMLDivElement | HTMLSpanElement>
) => {
  if (from.current && to.current && refParentContainer.current) {
    const { current: currentParentContainer } = refParentContainer;
    const { current: currentChildren } = to;
    const { current: currentPath } = from;

    const {
      x,
      y,
      width: widthCurrentPath,
      height: heightCurrentPath,
    } = currentPath.getBoundingClientRect();
    const { x: xParent, y: yParent } =
      currentParentContainer.getBoundingClientRect();

    currentChildren.style.top = `${y - yParent}px`;
    currentChildren.style.left = `${x - xParent}px`;
    currentChildren.style.width = `${widthCurrentPath}px`;
    currentChildren.style.height = `${heightCurrentPath}px`;
    currentChildren.style.display = "flex";
  }
};
