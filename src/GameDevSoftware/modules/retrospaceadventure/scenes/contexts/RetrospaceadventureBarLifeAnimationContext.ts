import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import RetrospaceadventureGameContext from "./RetrospaceadventureGameContext";

export const useAnimationStatus = () => {
  const {
    stateGame: { effectState, status },
    dispatchGame,
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);
  const [baseLifeHero, setBaseLifeHero] = useState(Hero.life);
  const [baseLifeEnemy, setBaseLifeEnemy] = useState(Enemy.life);

  const [animationBarLifeHeroStarted, setAnimationBarLifeHeroStarted] =
    useState<boolean>(false);
  const [animationBarLifeEnemyStarted, setAnimationBarLifeEnemyStarted] =
    useState<boolean>(false);
  const [animationBarLifeHeroDone, setAnimationBarLifeHeroDone] =
    useState<boolean>(false);
  const [animationBarLifeEnemyDone, setAnimationBarLifeEnemyDone] =
    useState<boolean>(false);

  const dispatchApplyEffectsEchec = useCallback(
    () => setTimeout(() => dispatchGame({ type: "applyEffectsEchec" }), 1000),
    []
  );
  const dispatchApplyFight = useCallback(
    () => setTimeout(() => dispatchGame({ type: "fight" }), 4000),
    []
  );
  const dispatchAfterAnimationDone = useCallback(() => {
    setAnimationBarLifeHeroStarted(false);
    setAnimationBarLifeEnemyStarted(false);
    setAnimationBarLifeHeroDone(false);
    setAnimationBarLifeEnemyDone(false);
    if (status === "applyEffects") {
      dispatchApplyEffectsEchec();
    }
    if (status === "applyEffectsEchec") {
      dispatchApplyFight();
    }
  }, [status]);

  useEffect(() => {
    if (!effectState) return;
    if (!(status === "applyEffects" || status === "applyEffectsEchec")) return;
    if (
      (status === "applyEffects" || status === "applyEffectsEchec") &&
      Hero.life === baseLifeHero &&
      Enemy.life === baseLifeEnemy
    ) {
      setTimeout(() => {
        dispatchAfterAnimationDone();
      }, 500);
    }
  }, [effectState]);

  useEffect(() => {
    setTimeout(() => setBaseLifeHero(Hero.life), 100);
  }, [Hero.life]);

  useEffect(() => {
    setTimeout(() => setBaseLifeEnemy(Enemy.life), 100);
  }, [Enemy.life]);

  useEffect(() => {
    if (
      !animationBarLifeHeroStarted &&
      !animationBarLifeEnemyStarted &&
      !animationBarLifeHeroDone &&
      !animationBarLifeEnemyDone
    )
      return;
    if (
      animationBarLifeHeroStarted &&
      animationBarLifeEnemyStarted &&
      !(animationBarLifeHeroDone && animationBarLifeEnemyDone)
    ) {
      return;
    }
    if (
      animationBarLifeHeroStarted &&
      animationBarLifeEnemyStarted &&
      animationBarLifeHeroDone &&
      animationBarLifeEnemyDone
    ) {
      dispatchAfterAnimationDone();
    } else if (animationBarLifeHeroStarted && animationBarLifeHeroDone) {
      dispatchAfterAnimationDone();
    } else if (animationBarLifeEnemyStarted && animationBarLifeEnemyDone) {
      dispatchAfterAnimationDone();
    }
  }, [
    animationBarLifeHeroStarted,
    animationBarLifeHeroDone,
    animationBarLifeEnemyStarted,
    animationBarLifeEnemyDone,
    dispatchAfterAnimationDone,
  ]);

  return {
    setAnimationBarLifeHeroStarted,
    setAnimationBarLifeEnemyStarted,
    setAnimationBarLifeHeroDone,
    setAnimationBarLifeEnemyDone,
  };
};

type BarLifeAnimationContextContextInterface = ReturnType<
  typeof useAnimationStatus
>;

const defaultContext: BarLifeAnimationContextContextInterface = {
  setAnimationBarLifeEnemyDone: () => {},
  setAnimationBarLifeEnemyStarted: () => {},
  setAnimationBarLifeHeroDone: () => {},
  setAnimationBarLifeHeroStarted: () => {},
};

const RetrospaceadventureBarLifeAnimationContext =
  createContext<BarLifeAnimationContextContextInterface>(defaultContext);

export default RetrospaceadventureBarLifeAnimationContext;
