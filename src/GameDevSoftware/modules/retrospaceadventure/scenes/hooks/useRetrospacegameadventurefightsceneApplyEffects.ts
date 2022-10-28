import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import useRetrospacegameadventurefightsceneEffects from "./useRetrospacegameadventurefightsceneEffects";
import useRetrospacegameadventurefightsceneUtils from "./useRetrospacegameadventurefightsceneUtils";

const useRetrospacegameadventurefightsceneApplyEffects = () => {
  const { stateGame, updateHero, updateEnemy } = useContext(
    RetrospaceadventureGameContext
  );
  const { findCardHeroById, findCardEnemyById } =
    useRetrospacegameadventurefightsceneUtils();

  const {
    appendCanonLaserDamage,
    applyDamage,
    applyHalfDamage,
    applyDoubleDamage,
    applyUseFullCanonLaser,
    fullHeal,
    halfHeal,
  } = useRetrospacegameadventurefightsceneEffects();

  const applyEffects = useCallback(
    (howWin: "win" | "draw" | "loose") => {
      const cardHero = findCardHeroById();
      const cardEnemy = findCardEnemyById();
      alert(
        `
          Hero:\n\tcard: ${cardHero.name} \n\telement: ${
          stateGame.hero.elementChoice
        }
          Enemy:\n\tcard: ${cardEnemy.name} \n\telement: ${
          stateGame.enemy.elementChoice
        }
          ${
            howWin === "win"
              ? "You win"
              : howWin === "loose"
              ? "You loose"
              : howWin === "draw"
              ? "You draw"
              : ""
          }
          `
      );
      if (howWin === "win") {
        switch (cardHero.critical_effect) {
          case "double_damage":
            applyDoubleDamage(cardHero, updateEnemy);
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(true, true);
            break;
          case "full_heal":
            fullHeal(cardHero, updateHero);
            break;
          default:
            return;
        }
        switch (cardEnemy.echec_effect) {
          case "half_damage":
            applyHalfDamage(cardEnemy, updateHero);
            break;
          case "use_half_laser":
            applyUseFullCanonLaser(false, false);
            break;
          case "half_heal":
            halfHeal(cardEnemy, updateEnemy);
            break;
          default:
            return;
        }
      }
      if (howWin === "loose") {
        switch (cardEnemy.critical_effect) {
          case "double_damage":
            applyDoubleDamage(cardEnemy, updateHero);
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(false, true);
            break;
          case "full_heal":
            fullHeal(cardEnemy, updateEnemy);
            break;
          default:
            return;
        }
        switch (cardHero.echec_effect) {
          case "half_damage":
            applyHalfDamage(cardHero, updateEnemy);
            break;
          case "use_half_laser":
            applyUseFullCanonLaser(true, false);
            break;
          case "half_heal":
            halfHeal(cardHero, updateHero);
            break;
          default:
            return;
        }
      }
      if (howWin === "draw") {
        switch (cardHero.draw_effect) {
          case "damage":
            applyDamage(cardHero, updateEnemy);
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(true, true);
            break;
          case "full_heal":
            fullHeal(cardHero, updateHero);
            break;
          default:
            return;
        }
        switch (cardEnemy.draw_effect) {
          case "damage":
            applyDamage(cardEnemy, updateHero);
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(false, true);
            break;
          case "full_heal":
            halfHeal(cardEnemy, updateEnemy);
            break;
          default:
            return;
        }
      }
      appendCanonLaserDamage(cardHero, updateHero);
      appendCanonLaserDamage(cardEnemy, updateEnemy);
    },
    [stateGame, findCardHeroById, findCardEnemyById]
  );

  return applyEffects;
};

export default useRetrospacegameadventurefightsceneApplyEffects;
