import { useCallback, useEffect, useState } from "react";

import { useGameProvider } from "../../../../../gameProvider";
import { useGameObjects } from "../../../../../hooks";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCharacter,
  RetrospaceadventureCharacterJSON,
} from "../types";

const useRetrospacegameadventurefightsceneCharacters = (
  enemy: string,
  hero: string
) => {
  const [Hero, setHero] = useState<RetrospaceadventureCharacter>();
  const [Enemy, setEnemy] = useState<RetrospaceadventureCharacter>();
  const { getGameObject } = useGameObjects();
  const { getValueFromConstant } = useGameProvider();

  const transformJSONtoCharacter = useCallback(
    (character: RetrospaceadventureCharacterJSON) => {
      // @ts-ignore
      const characterGame: RetrospaceadventureCharacter = {
        name: character._title,
        life: getValueFromConstant(
          "retrospaceadventure_character_default_life"
        ),
        baseLife: getValueFromConstant(
          "retrospaceadventure_character_default_life"
        ),
        laser: getValueFromConstant(
          "retrospaceadventure_character_default_laser"
        ),
        character_type: character.character_type,
        image: character.image,
        atlasFile: character.atlasFile,
        animationFile: character.animationFile,
        minigames:
          character.minigames?.map(
            (minigame) => getGameObject(minigame)._title
          ) || [],
        cards:
          character.cards?.map((card) =>
            getGameObject<RetrospaceadventureCard>(card)
          ) || [],
      };
      if (characterGame.character_type === "hero") {
        setHero(characterGame);
      } else {
        setEnemy(characterGame);
      }
    },
    [getValueFromConstant]
  );

  useEffect(() => {
    const go = getGameObject(hero);

    transformJSONtoCharacter(go);
  }, [hero, getGameObject, transformJSONtoCharacter]);

  useEffect(() => {
    const go = getGameObject(enemy);

    transformJSONtoCharacter(go);
  }, [enemy, getGameObject, transformJSONtoCharacter]);

  return {
    Hero,
    Enemy,
    setHero,
    setEnemy,
  };
};

export default useRetrospacegameadventurefightsceneCharacters;
