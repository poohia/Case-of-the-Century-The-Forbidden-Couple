import { useCallback, useEffect, useState } from "react";
import { useAssets, useGameObjects } from "../../../../../hooks";
import {
  RetrospaceadventureCard,
  RetrospaceadventureCardEffect,
  RetrospaceadventureCharacter,
  RetrospaceadventureCharacterJSON,
} from "../types";

const useRetrospacegameadventurefightsceneCharacters = (
  enemy: string,
  hero: string
) => {
  const [Hero, setHero] = useState<RetrospaceadventureCharacter>();
  const [Enemy, setEnemy] = useState<RetrospaceadventureCharacter>();
  const { gameObjects, getGameObject } = useGameObjects();
  const { getAssetImg } = useAssets();

  const transformJSONCardtoCard = useCallback(
    (id: number): RetrospaceadventureCard => {
      const card = getGameObject<{
        _title: string;
        image: string;
        damage: number;
        echec_effect: RetrospaceadventureCardEffect;
        critical_effect: RetrospaceadventureCardEffect;
        _id: number;
      }>(id);

      return {
        name: card._title,
        image: getAssetImg(card.image),
        damage: card.damage,
        echec_effect: card.echec_effect,
        critical_effect: card.critical_effect,
      };
    },
    [gameObjects, getGameObject, getAssetImg]
  );

  const transformJSONtoCharacter = useCallback(
    (character: RetrospaceadventureCharacterJSON) => {
      const characterGame: RetrospaceadventureCharacter = {
        name: character._title,
        life: 1500,
        laser: 0,
        character_type: character.character_type,
        image: getAssetImg(character.image),
        cards: character.cards.map((c) =>
          transformJSONCardtoCard(Number(c.card.replace("@go:", "")))
        ),
      };
      if (characterGame.character_type === "hero") {
        setHero(characterGame);
      } else {
        setEnemy(characterGame);
      }
    },
    [transformJSONCardtoCard, getAssetImg]
  );

  useEffect(() => {
    if (gameObjects.length > 0) {
      const go = getGameObject(Number(hero.replace("@go:", "")));
      if (go) {
        transformJSONtoCharacter(go);
      }
    }
  }, [gameObjects, hero, getGameObject, transformJSONtoCharacter]);

  useEffect(() => {
    if (gameObjects.length > 0) {
      const go = getGameObject(Number(enemy.replace("@go:", "")));
      if (go) {
        transformJSONtoCharacter(go);
      }
    }
  }, [gameObjects, enemy, getGameObject, transformJSONtoCharacter]);

  return {
    Hero,
    Enemy,
    setHero,
    setEnemy,
  };
};

export default useRetrospacegameadventurefightsceneCharacters;
