import { useContext, useEffect, useMemo, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { RetrospaceadventureCharacter } from "../types";
import {
  HeroCardCharacter,
  EnemyCardCharacter,
  EnemyCardChoiceSelected,
  HeroCardChoiceSelected,
} from "./RetrospacegameadventurefightsceneStyledComponents";
import {
  BarLaserLeft,
  BarLaserRight,
  BarLifeLeft,
  BarLifeRight,
} from "./styled/Bar";
import { SpriteComponent } from "../../../../../components";

const RetrospacegameadventurefightsceneStatsRowLeft: React.FC<{
  character: RetrospaceadventureCharacter;
  forceZeroLife: boolean;
}> = ({ character, forceZeroLife }) => {
  const {
    stateGame: { effectState, enemy, status },
    Hero,
  } = useContext(RetrospaceadventureGameContext);

  const [showDamageSprite, setShowDamageSprite] = useState<boolean>(false);
  const [showCardEnemy, setShowCardEnemy] = useState<boolean>(false);
  const cardEnemy = useMemo(() => {
    if (enemy.cardChoice) {
      return enemy.cards.find((c) => c.id === enemy.cardChoice);
    }
    return null;
  }, [enemy]);

  useEffect(() => {
    if (effectState?.message === "criticalHero") {
      setShowDamageSprite(true);
    }
  }, [effectState]);

  useEffect(() => {
    if (status === "startMinigame") {
      setShowCardEnemy(true);
    } else {
      setShowCardEnemy(false);
    }
  }, [status]);

  return (
    <EnemyCardCharacter>
      <div>
        {!showDamageSprite && <SpriteComponent {...character.imageIdle} />}
        {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )}
        {showCardEnemy && cardEnemy && (
          <EnemyCardChoiceSelected className="animate__animated animate__bounceIn">
            <img src={cardEnemy.image} alt="" />
          </EnemyCardChoiceSelected>
        )}
      </div>
      <div>
        <div>
          <BarLifeLeft
            baseValue={character.baseLife}
            value={forceZeroLife ? 0 : character.life}
          />
        </div>
        <BarLaserLeft baseValue={Hero.life} value={character.laser} />
        {/* <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"start"}
        /> */}
      </div>
    </EnemyCardCharacter>
  );
};

const RetrospacegameadventurefightsceneStatsRowRight: React.FC<{
  character: RetrospaceadventureCharacter;
  forceZeroLife: boolean;
}> = ({ character, forceZeroLife }) => {
  const {
    stateGame: { effectState, hero, status },
    Enemy,
  } = useContext(RetrospaceadventureGameContext);

  const [showDamageSprite, setShowDamageSprite] = useState<boolean>(false);
  const [showCardHero, setShowCardHero] = useState<boolean>(false);
  const cardHero = useMemo(() => {
    if (hero.cardChoice) {
      return hero.cards.find((c) => c.id === hero.cardChoice);
    }
    return null;
  }, [hero]);

  useEffect(() => {
    if (effectState?.message === "criticalEnemy") {
      setShowDamageSprite(true);
    }
  }, [effectState]);

  useEffect(() => {
    if (status === "startMinigame") {
      setShowCardHero(true);
    } else {
      setShowCardHero(false);
    }
  }, [status]);

  return (
    <HeroCardCharacter>
      <div>
        {/* <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"end"}
        /> */}
        <BarLaserRight value={character.laser} baseValue={Enemy.life} />
        <div>
          <BarLifeRight
            baseValue={character.baseLife}
            value={forceZeroLife ? 0 : character.life}
          />
        </div>
      </div>
      <div>
        {showCardHero && cardHero && (
          <HeroCardChoiceSelected className="animate__animated animate__bounceIn">
            <img src={cardHero.image} alt="" />
          </HeroCardChoiceSelected>
        )}
        {!showDamageSprite && <SpriteComponent {...character.imageIdle} />}
        {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )}
      </div>
    </HeroCardCharacter>
  );
};

const RetrospacegameadventurefightsceneStatsRow: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  const { messageFightInfoStatus } = useContext(RetrospaceadventureGameContext);
  const [forceZeroLifeHero, setForceZeroLifeHero] = useState<boolean>(false);
  const [forceZeroLifeEnemy, setForceZeroLifeEnemy] = useState<boolean>(false);

  useEffect(() => {
    if (
      messageFightInfoStatus === "loose" &&
      character.character_type === "hero"
    ) {
      setForceZeroLifeHero(true);
    }
    if (
      messageFightInfoStatus === "win" &&
      character.character_type === "enemy"
    ) {
      setForceZeroLifeEnemy(true);
    }
  }, [messageFightInfoStatus, character]);

  if (character.character_type === "enemy") {
    return (
      <RetrospacegameadventurefightsceneStatsRowLeft
        character={character}
        forceZeroLife={forceZeroLifeEnemy}
      />
    );
  }
  return (
    <RetrospacegameadventurefightsceneStatsRowRight
      character={character}
      forceZeroLife={forceZeroLifeHero}
    />
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
