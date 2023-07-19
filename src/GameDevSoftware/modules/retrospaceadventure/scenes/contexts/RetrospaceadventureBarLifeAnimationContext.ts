import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import RetrospaceadventureGameContext from "./RetrospaceadventureGameContext";
import { RetrospaceAdventureAnimationsCharacter } from "../types";
import { useGameProvider } from "../../../../../gameProvider";

export type AnimationReducerState = {
  animationBarLifeHeroStarted: boolean;
  animationBarLifeEnemyStarted: boolean;
  animationBarLifeHeroDone: boolean;
  animationBarLifeEnemyDone: boolean;
  animationHero: RetrospaceAdventureAnimationsCharacter;
  animationEnemy: RetrospaceAdventureAnimationsCharacter;
};
export type AnimationReducerAction =
  | Extract<keyof AnimationReducerState, string>
  | "reset"
  | "animationDamageHero"
  | "animationDamageEnemy"
  | "animationHealHero"
  | "animationHealEnemy";

const animationStatusDefault: AnimationReducerState = {
  animationBarLifeEnemyDone: false,
  animationBarLifeEnemyStarted: false,
  animationBarLifeHeroDone: false,
  animationBarLifeHeroStarted: false,
  animationHero: "idle_animation",
  animationEnemy: "idle_animation",
};

const animationStatusReducer = (
  state: AnimationReducerState,
  action: AnimationReducerAction
): AnimationReducerState => {
  switch (action) {
    case "animationBarLifeEnemyDone":
      return { ...state, animationBarLifeEnemyDone: true };
    case "animationBarLifeEnemyStarted":
      return { ...state, animationBarLifeEnemyStarted: true };
    case "animationBarLifeHeroDone":
      return { ...state, animationBarLifeHeroDone: true };
    case "animationBarLifeHeroStarted":
      return {
        ...state,
        animationBarLifeHeroStarted: true,
      };
    case "animationDamageHero":
      return { ...state, animationHero: "damage_animation" };
    case "animationDamageEnemy":
      return { ...state, animationEnemy: "damage_animation" };
    case "animationHealHero":
      return { ...state, animationHero: "heal_animation" };
    case "animationHealEnemy":
      return { ...state, animationEnemy: "heal_animation" };
    case "reset":
      return animationStatusDefault;
    default:
      return state;
  }
};

export const useAnimationStatus = () => {
  const {
    stateGame: { effectState, status },
    dispatchGame,
    Hero,
    Enemy,
  } = useContext(RetrospaceadventureGameContext);
  const { preloadSound, playSound, pauseSounds } = useGameProvider();
  const [baseLifeHero, setBaseLifeHero] = useState(Hero.life);
  const [baseLifeEnemy, setBaseLifeEnemy] = useState(Enemy.life);

  const [state, dispatch] = useReducer(
    animationStatusReducer,
    animationStatusDefault
  );
  const {
    animationBarLifeEnemyDone,
    animationBarLifeEnemyStarted,
    animationBarLifeHeroDone,
    animationBarLifeHeroStarted,
    animationEnemy,
    animationHero,
  } = state;

  const dispatchApplyEffectsEchec = useCallback(() => {
    pauseSounds(["hit.mp3", "heal.mp3"]);
    setTimeout(() => dispatchGame({ type: "applyEffectsEchec" }), 1500);
  }, []);
  const dispatchApplyFight = useCallback(() => {
    pauseSounds(["hit.mp3", "heal.mp3"]);
    setTimeout(() => dispatchGame({ type: "fight" }), 5500);
  }, []);

  const dispatchAfterAnimationDone = useCallback(() => {
    if (status === "applyEffects") {
      dispatchApplyEffectsEchec();
    }
    if (status === "applyEffectsEchec") {
      dispatchApplyFight();
    }
    setTimeout(() => dispatch("reset"), 1000);
  }, [status]);

  useEffect(() => {
    preloadSound("hit.mp3", 0.4, true);
    preloadSound("heal.mp3", 0.4, true);
  }, []);

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

  const setAnimationBarLifeHeroStarted = useCallback(() => {
    dispatch("animationBarLifeHeroStarted");
    if (Hero.life > baseLifeHero) {
      playSound("heal.mp3", 0, null, 0);
      dispatch("animationHealHero");
    } else if (Hero.life < baseLifeHero) {
      playSound("hit.mp3", 0, null, 0);
      dispatch("animationDamageHero");
    }
  }, [Hero, baseLifeHero]);

  const setAnimationBarLifeEnemyStarted = useCallback(() => {
    dispatch("animationBarLifeEnemyStarted");
    if (Enemy.life > baseLifeEnemy) {
      playSound("heal.mp3", 0, null, 0);
      dispatch("animationHealEnemy");
    } else if (Enemy.life < baseLifeEnemy) {
      playSound("hit.mp3", 0, null, 0);
      dispatch("animationDamageEnemy");
    }
  }, [Enemy, baseLifeEnemy]);

  return {
    animationEnemy,
    animationHero,
    setAnimationBarLifeHeroStarted,
    setAnimationBarLifeEnemyStarted,
    setAnimationBarLifeHeroDone: () => {
      dispatch("animationBarLifeHeroDone");
    },
    setAnimationBarLifeEnemyDone: () => {
      dispatch("animationBarLifeEnemyDone");
    },
  };
};

type BarLifeAnimationContextContextInterface = ReturnType<
  typeof useAnimationStatus
>;

const defaultContext: BarLifeAnimationContextContextInterface = {
  animationEnemy: "idle_animation",
  animationHero: "idle_animation",
  setAnimationBarLifeEnemyDone: () => {},
  setAnimationBarLifeEnemyStarted: () => {},
  setAnimationBarLifeHeroDone: () => {},
  setAnimationBarLifeHeroStarted: () => {},
};

const RetrospaceadventureBarLifeAnimationContext =
  createContext<BarLifeAnimationContextContextInterface>(defaultContext);

export default RetrospaceadventureBarLifeAnimationContext;
