import { useCallback, useEffect, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets, useGameObjects } from "../../../../../hooks";
import {
  RestrospaceSkillType,
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
  const getGameObject = useGameObjects();
  const { getAssetImg } = useAssets();
  const { getValueFromConstant } = useGameProvider();

  const transformJSONCardtoCard = useCallback(
    (card: string, i: number): RetrospaceadventureCard => {
      const cardGameObject = getGameObject<{
        _title: string;
        image: string;
        damage: number;
        laser: number;
        critical_effect: string;
        echec_effect: string;
        _id: number;
      }>(card);

      return {
        id: i,
        name: cardGameObject._title,
        image: getAssetImg(cardGameObject.image),
        damage: cardGameObject.damage,
        laser: cardGameObject.laser,
        critical_effect: getGameObject<RestrospaceSkillType>(
          cardGameObject.critical_effect
        ),
        echec_effect: getGameObject<RestrospaceSkillType>(
          cardGameObject.echec_effect
        ),
      };
    },
    [getGameObject, getAssetImg]
  );

  const transformJSONtoCharacter = useCallback(
    (character: RetrospaceadventureCharacterJSON) => {
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
        imageIdle: character.imageIdle,
        imageDamage: character.imageDamage,
        cards: character.cards.map((c, i) =>
          transformJSONCardtoCard(
            c.card,
            character.character_type === "hero" ? i + 1 : i + 1 * 50
          )
        ),
        minigames: character.minigames?.map(
          (minigame) => getGameObject(minigame)._title
        ),
      };
      if (characterGame.character_type === "hero") {
        setHero(characterGame);
      } else {
        setEnemy(characterGame);
      }
    },
    [transformJSONCardtoCard, getValueFromConstant]
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
