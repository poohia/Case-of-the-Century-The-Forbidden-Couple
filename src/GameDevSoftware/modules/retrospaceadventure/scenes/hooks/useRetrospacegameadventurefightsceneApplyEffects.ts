import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import useRetrospacegameadventurefightsceneEffects from "./useRetrospacegameadventurefightsceneEffects";
import useRetrospacegameadventurefightsceneUtils from "./useRetrospacegameadventurefightsceneUtils";

const useRetrospacegameadventurefightsceneApplyEffects = () => {
  const { stateGame, updateHero, updateEnemy, dispatchGame } = useContext(
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

      if (howWin === "win") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "criticalHero",
              value: cardHero.damage,
              effect: cardHero.critical_effect,
            },
          } as GameReducerActionData,
        });
        appendCanonLaserDamage(cardHero, updateHero);
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
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "echecEnemy",
                value: cardEnemy.damage,
                effect: cardEnemy.echec_effect,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardEnemy, updateEnemy);
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
          }
        }, 1000);
      }
      if (howWin === "loose") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "criticalEnemy",
              value: cardEnemy.damage,
              effect: cardEnemy.critical_effect,
            },
          } as GameReducerActionData,
        });
        appendCanonLaserDamage(cardEnemy, updateEnemy);
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
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "echecHero",
                value: cardHero.damage,
                effect: cardHero.echec_effect,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardHero, updateHero);
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
          }
        }, 1000);
      }
      if (howWin === "draw") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "drawHero",
              value: cardHero.damage,
              effect: cardHero.draw_effect,
            },
          } as GameReducerActionData,
        });
        appendCanonLaserDamage(cardHero, updateHero);
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
        }
        setTimeout(() => {
          dispatchGame({
            type: "appendEffect",
            data: {
              effectState: {
                message: "drawEnemy",
                value: cardEnemy.damage,
                effect: cardEnemy.draw_effect,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardEnemy, updateEnemy);
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
        }, 1000);
      }
    },
    [stateGame, findCardHeroById, findCardEnemyById]
  );

  return applyEffects;
};

export default useRetrospacegameadventurefightsceneApplyEffects;
