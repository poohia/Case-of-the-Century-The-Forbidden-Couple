import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Card from "./styled/Card";
import styled from "styled-components";
import AnimationScene from "../minigames/AnimationScene";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import useRetrospacegameadventurefightsceneUtils from "../hooks/useRetrospacegameadventurefightsceneUtils";
import { EffectStateType } from "../types";

const AnimationContainer = styled.div`
  position: Absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
`;

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  const [phaserScene, setPhaserScene] = useState<Phaser.Game | null>(null);
  const [scene, setScene] = useState<AnimationScene | null>(null);
  const [createdDone, setCreatedDone] = useState<boolean>(false);
  const [messages, setMessages] = useState<EffectStateType[]>([]);
  const {
    stateGame: { howWin, effectState },
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);
  const { preloadSound, playSound } = useGameProvider();
  const { getAssetImg, getConfigurationFile } = useAssets();
  const {
    findCardHeroById,
    findCardEnemyById,
    findEffectHeroByIdAndHowWin,
    findEffectEnemyByIdAndHowWin,
  } = useRetrospacegameadventurefightsceneUtils();
  const phaserAnimationContainer = useRef<HTMLDivElement>(null);

  const cardHero = useMemo(() => findCardHeroById(), [findCardHeroById]);
  const cardEnemy = useMemo(() => findCardEnemyById(), [findCardEnemyById]);
  const effectHero = useMemo(
    () => findEffectHeroByIdAndHowWin(),
    [findEffectHeroByIdAndHowWin]
  );
  const effectEnemy = useMemo(
    () => findEffectEnemyByIdAndHowWin(),
    [findEffectEnemyByIdAndHowWin]
  );

  useEffect(() => {
    setTimeout(() => {
      dispatchGame({ type: "fight" });
    }, 4000);
  }, [dispatchGame]);

  useEffect(() => {
    if (phaserAnimationContainer && phaserAnimationContainer.current) {
      const {
        current: { clientWidth: width, clientHeight: height },
      } = phaserAnimationContainer;

      const s = new AnimationScene({
        width,
        height,
        animations: [
          {
            phaserAnimation: getConfigurationFile(effectEnemy.animation),
            atlas: getConfigurationFile(effectEnemy.atlas),
            atlasName: effectEnemy.atlasName,
            image: getAssetImg(effectEnemy.image),
            position: "left",
          },
          {
            phaserAnimation: getConfigurationFile(effectHero.animation),
            atlas: getConfigurationFile(effectHero.atlas),
            atlasName: effectHero.atlasName,
            image: getAssetImg(effectHero.image),
            position: "right",
          },
        ],
        loadSound: preloadSound,
        playSound,
        onCreated: () => setCreatedDone(true),
      });
      setScene(s);
      setPhaserScene(new Phaser.Game({ ...s.config(), scene: s }));
    }
  }, [phaserAnimationContainer]);

  useEffect(() => {
    if (!effectState) return;

    setMessages((_messages) => {
      return [..._messages, effectState];
    });
  }, [effectState]);

  useEffect(() => {
    return () => {
      phaserScene?.destroy(false);
    };
  }, [phaserScene]);

  useEffect(() => {
    if (messages.length === 1 && howWin === "win" && createdDone) {
      scene?.appendRightAnimation();
    } else if (messages.length === 1 && howWin === "loose" && createdDone) {
      scene?.appendLeftAnimation();
    } else if (messages.length === 2 && howWin === "win" && createdDone) {
      scene?.appendLeftAnimation();
    } else if (messages.length === 2 && howWin === "loose" && createdDone) {
      scene?.appendRightAnimation();
    }
  }, [messages, scene, createdDone, howWin]);

  useEffect(() => {
    setCreatedDone(false);
    setMessages([]);
  }, []);

  if (!cardHero || !cardEnemy) return <div />;

  return (
    <>
      <AnimationContainer
        id="animationcontent"
        ref={phaserAnimationContainer}
      />
      <ContainerRowFightCenter>
        <p>
          <b>
            {howWin === "win" && "Héro à gagné"}
            {howWin === "loose" && "Alien à gagné"}
          </b>
        </p>
        <Card active={howWin === "loose"} card={cardEnemy} onClick={() => {}} />
        <Card active={howWin === "win"} card={cardHero} onClick={() => {}} />
      </ContainerRowFightCenter>
    </>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
