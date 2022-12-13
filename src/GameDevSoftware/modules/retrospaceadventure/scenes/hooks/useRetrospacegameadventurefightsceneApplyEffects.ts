import { useCallback, useContext } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { GameReducerActionData } from "../reducers/gameReducer";
import { TurnStatus } from "../types";
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
    applyHalfDamage,
    applyDoubleDamage,
    applyUseFullCanonLaser,
    doubleHeal,
    halfHeal,
    applyHalfLife,
    applyFullLife,
    applyHalfLaser,
    appendDamageToLaser,
  } = useRetrospacegameadventurefightsceneEffects();

  const applyEffects = useCallback(
    (howWin: TurnStatus) => {
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
              name: cardHero.name,
            },
          } as GameReducerActionData,
        });

        appendCanonLaserDamage(cardHero, updateHero);
        switch (cardHero.critical_effect) {
          case "double_damage":
            applyDoubleDamage(
              cardHero,
              updateEnemy,
              cardEnemy.echec_effect === "protect_self",
              cardEnemy.echec_effect === "suffer_double_damage"
            );
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(
              true,
              true,
              cardEnemy.echec_effect === "protect_self"
            );
            break;
          case "half_laser_target":
            applyHalfLaser(
              updateEnemy,
              cardEnemy.echec_effect === "protect_self"
            );
            break;
          case "double_heal":
            doubleHeal(cardHero, updateHero);
            break;
          case "half_life_target":
            applyHalfLife(
              updateEnemy,
              cardEnemy.echec_effect === "protect_self"
            );
            break;
          case "full_life_self":
            applyFullLife(updateHero);
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
                name: cardEnemy.name,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardEnemy, updateEnemy);
          switch (cardEnemy.echec_effect) {
            case "half_damage":
              applyHalfDamage(
                cardEnemy,
                updateHero,
                cardHero.critical_effect === "protect_self"
              );
              break;
            case "use_half_laser":
              applyUseFullCanonLaser(
                false,
                false,
                cardHero.critical_effect === "protect_self"
              );
              break;
            case "half_heal":
              halfHeal(cardEnemy, updateEnemy);
              break;
            case "half_life_self":
              applyHalfLife(updateEnemy);
              break;
            case "full_life_target":
              applyFullLife(updateHero);
              break;
            case "append_damage_to_laser_target":
              appendDamageToLaser(cardEnemy.damage, updateHero);
              break;
          }
        }, 2000);
      }
      if (howWin === "loose") {
        dispatchGame({
          type: "appendEffect",
          data: {
            effectState: {
              message: "criticalEnemy",
              value: cardEnemy.damage,
              effect: cardEnemy.critical_effect,
              name: cardEnemy.name,
            },
          } as GameReducerActionData,
        });

        appendCanonLaserDamage(cardEnemy, updateEnemy);
        switch (cardEnemy.critical_effect) {
          case "double_damage":
            applyDoubleDamage(
              cardEnemy,
              updateHero,
              cardHero.echec_effect === "protect_self",
              cardHero.echec_effect === "suffer_double_damage"
            );
            break;
          case "use_full_laser":
            applyUseFullCanonLaser(
              false,
              true,
              cardHero.echec_effect === "protect_self"
            );
            break;
          case "double_heal":
            doubleHeal(cardEnemy, updateEnemy);
            break;
          case "half_life_target":
            applyHalfLife(updateHero, cardHero.echec_effect === "protect_self");
            break;
          case "full_life_self":
            applyFullLife(updateEnemy);
            break;
          case "half_laser_target":
            applyHalfLaser(
              updateHero,
              cardHero.echec_effect === "protect_self"
            );
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
                name: cardHero.name,
              },
            } as GameReducerActionData,
          });
          appendCanonLaserDamage(cardHero, updateHero);
          switch (cardHero.echec_effect) {
            case "half_damage":
              applyHalfDamage(
                cardHero,
                updateEnemy,
                cardEnemy.critical_effect === "protect_self"
              );
              break;
            case "use_half_laser":
              applyUseFullCanonLaser(
                true,
                false,
                cardEnemy.critical_effect === "protect_self"
              );
              break;
            case "half_heal":
              halfHeal(cardHero, updateHero);
              break;
            case "half_life_self":
              applyHalfLife(updateHero);
              break;
            case "full_life_target":
              applyFullLife(updateEnemy);
              break;
            case "append_damage_to_laser_target":
              appendDamageToLaser(cardHero.damage, updateEnemy);
              break;
          }
        }, 2000);
      }
    },
    [stateGame, findCardHeroById, findCardEnemyById]
  );

  return applyEffects;
};

export default useRetrospacegameadventurefightsceneApplyEffects;
