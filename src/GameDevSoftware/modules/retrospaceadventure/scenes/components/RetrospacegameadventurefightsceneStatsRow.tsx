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
  const TargetCharacter = useMemo(
    () => (!isHero ? Hero : Enemy),
    [isHero, Hero, Enemy]
  );
  const [baseLife, setBaseLife] = useState(Character.life);
  const [targetBaseLife, setTargetBaseLife] = useState(TargetCharacter.life);
  const [animationWillBe, setAnimationWillBe] = useState<boolean>(false);
  const [actionWillBe, setActionWillBe] = useState<boolean>(false);

  const dispatchApplyEffectsEchec = useCallback(
    () => setTimeout(() => dispatchGame({ type: "applyEffectsEchec" }), 1000),
    []
  );
  const dispatchApplyFight = useCallback(
    () => setTimeout(() => dispatchGame({ type: "fight" }), 4000),
    []
  );

  const dispatchAfterAnimationDone = useCallback(() => {
    // console.log(effectState);
    // console.log(status);
    // console.log("character", Character, baseLife);
    // console.log("target", TargetCharacter, targetBaseLife);
    // console.log(effectState);
    // if (
    //   (isHero && !effectState?.message.includes("Hero")) ||
    //   (!isHero && !effectState?.message.includes("Enemy"))
    // )
    //   return;
    console.log("dispatchAfterAnimationDone");
    if (status === "applyEffects") {
      dispatchApplyEffectsEchec();
    }
    if (status === "applyEffectsEchec") {
      dispatchApplyFight();
    }
    // console.log("animation will be done");
    // setAnimationWillBe(false);
    // setActionWillBe(false);
  }, [status, effectState, isHero]);

  const onActionStarted = useCallback(() => {
    if (status === "applyEffects" || status === "applyEffectsEchec") {
      // console.log("animation will be");
      setAnimationWillBe(true);
    }
  }, [status]);

  // useEffect(() => {
  //   console.log(actionWillBe, animationWillBe);
  //   if (actionWillBe && !animationWillBe) {
  //     setTimeout(() => {
  //       console.log("i'm here");
  //       dispatchAfterAnimationDone();
  //       setActionWillBe(false);
  //     }, 500);
  //   }
  // }, [actionWillBe, animationWillBe]);

  useEffect(() => {
    if (
      (isHero && !effectState?.message.includes("Hero")) ||
      (!isHero && !effectState?.message.includes("Enemy"))
    )
      return;
    // console.log(effectState);
    // console.log(status);
    // console.log("character", Character, baseLife);
    // console.log("target", TargetCharacter, targetBaseLife);

    if (
      (status === "applyEffects" || status === "applyEffectsEchec") &&
      TargetCharacter.life === targetBaseLife &&
      Character.life === baseLife
    ) {
      setTimeout(() => {
        console.log("i'm here");
        dispatchAfterAnimationDone();
      }, 500);
    } else {
      console.log("i'm here2");
    }
  }, [effectState]);

  useEffect(() => {
    setTimeout(() => setBaseLife(Character.life), 100);
  }, [Character.life]);

  useEffect(() => {
    setTimeout(() => setTargetBaseLife(TargetCharacter.life), 100);
  }, [TargetCharacter.life]);

  return {
    dispatchAfterAnimationDone,
    onActionStarted,
  };
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

  const { dispatchAfterAnimationDone, onActionStarted } =
    useAnimationStatus(false);

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
            onStartAnimation={onActionStarted}
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

  const { dispatchAfterAnimationDone, onActionStarted } =
    useAnimationStatus(true);

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
            onStartAnimation={onActionStarted}
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
