import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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
import { AnimationComponent, SpriteComponent } from "../../../../../components";

const useAnimationStatus = (isHero: boolean) => {
  const {
    stateGame: { effectState, enemy, status },
    dispatchGame,
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);
  const Character = useMemo(
    () => (isHero ? Hero : Enemy),
    [isHero, Hero, Enemy]
  );
  const [baseLife, setBaseLife] = useState(Character.life);

  const dispatchApplyEffectsEchec = useCallback(
    () => setTimeout(() => dispatchGame({ type: "applyEffectsEchec" }), 1000),
    []
  );
  const dispatchApplyFight = useCallback(
    () => setTimeout(() => dispatchGame({ type: "fight" }), 4000),
    []
  );

  // useEffect(() => {
  //   if (status === "applyEffects" && timeoutApplyEffect === null) {
  //     timeoutApplyEffect = setTimeout(() => {
  //       setBaseLife((l) => {
  //         console.log("i'm here", status, l, Character.life);
  //         if (l === Character.life) {
  //           dispatchApplyEffectsEchec();
  //         }
  //         timeoutApplyEffect = null;
  //         return Character.life;
  //       });
  //     }, 5000);
  //   } else if (
  //     status === "applyEffectsEchec" &&
  //     baseLife === Character.life &&
  //     timeoutApplyEffectEchec === null
  //   ) {
  //     timeoutApplyEffectEchec = setTimeout(() => {
  //       setBaseLife((l) => {
  //         console.log("i'm here", status, l, Character.life);
  //         if (l === Character.life) {
  //           dispatchApplyFight();
  //         }
  //         timeoutApplyEffectEchec = null;
  //         return Character.life;
  //       });
  //     }, 5000);
  //   }
  // }, [status]);

  const dispatchAfterAnimationDone = useCallback(() => {
    if (status === "applyEffects") {
      dispatchApplyEffectsEchec();
    }
    if (status === "applyEffectsEchec") {
      dispatchApplyFight();
    }
  }, [status, Character]);

  return dispatchAfterAnimationDone;
};

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

  const dispatchAfterAnimationDone = useAnimationStatus(false);

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
        <AnimationComponent
          animationFile={character.animationFile}
          animationName="idle_thumbnail_animation"
          atlasFile={character.atlasFile}
          imageFile={character.image}
        />
        {/* {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )} */}
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
            onAnimationFinished={dispatchAfterAnimationDone}
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

  const dispatchAfterAnimationDone = useAnimationStatus(true);

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
            onAnimationFinished={dispatchAfterAnimationDone}
          />
        </div>
      </div>
      <div>
        {showCardHero && cardHero && (
          <HeroCardChoiceSelected className="animate__animated animate__bounceIn">
            <img src={cardHero.image} alt="" />
          </HeroCardChoiceSelected>
        )}
        <AnimationComponent
          animationFile={character.animationFile}
          animationName="idle_thumbnail_animation"
          atlasFile={character.atlasFile}
          imageFile={character.image}
        />
        {/* {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )} */}
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
