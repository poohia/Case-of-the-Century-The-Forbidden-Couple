import React, { useContext, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { EffectStateType } from "../types";
import styled from "styled-components";
import AnimationScene from "../minigames/AnimationScene";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import useRetrospacegameadventurefightsceneUtils from "../hooks/useRetrospacegameadventurefightsceneUtils";

const AnimationContainer = styled.div`
  position: Absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
`;

const RetrospacegameadventurefightsceneResume: React.FC = () => {
  const [messages, setMessages] = useState<EffectStateType[]>([]);
  const [phaserScene, setPhaserScene] = useState<Phaser.Game | null>(null);
  const [scene, setScene] = useState<AnimationScene | null>(null);
  const [createdDone, setCreatedDone] = useState<boolean>(false);
  const {
    stateGame: { effectState, howWin },
  } = useContext(RetrospaceadventureGameContext);
  const { preloadSound, playSound } = useGameProvider();
  const { getAssetImg, getConfigurationFile } = useAssets();
  const { findEffectHeroByIdAndHowWin, findEffectEnemyByIdAndHowWin } =
    useRetrospacegameadventurefightsceneUtils();
  const phaserAnimationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!effectState) return;
    setMessages((_messages) => {
      return [..._messages, effectState];
    });
  }, [effectState]);

  useEffect(() => {
    if (phaserAnimationContainer && phaserAnimationContainer.current) {
      const {
        current: { clientWidth: width, clientHeight: height },
      } = phaserAnimationContainer;
      const effectHero = findEffectHeroByIdAndHowWin();
      const effectEnemy = findEffectEnemyByIdAndHowWin();

      const s = new AnimationScene({
        width,
        height,
        animations: [
          {
            phaserAnimation: getConfigurationFile(effectHero.animation),
            atlas: getConfigurationFile(effectHero.atlas),
            atlasName: effectHero.atlasName,
            image: getAssetImg(effectHero.image),
            position: "left",
          },
          {
            phaserAnimation: getConfigurationFile(effectEnemy.animation),
            atlas: getConfigurationFile(effectEnemy.atlas),
            atlasName: effectEnemy.atlasName,
            image: getAssetImg(effectEnemy.image),
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
    setMessages([]);
  }, []);

  useEffect(() => {
    return () => {
      phaserScene?.destroy(false);
    };
  }, [phaserScene]);

  useEffect(() => {
    if (messages.length === 2 && createdDone) {
      scene?.appendLeftAnimation();
      setTimeout(() => {
        scene?.appendRightAnimation();
      }, 1000);
    }
  }, [messages, scene, createdDone]);

  return (
    <>
      <AnimationContainer
        id="animationcontent"
        ref={phaserAnimationContainer}
      />
      <div>
        <div>
          <h1>Resume</h1>
        </div>
        {messages.map((message, i) => (
          <div key={`fight-resume-message-${i}`}>
            Card name: {message.name} / Message: {message.message} / Effect:{" "}
            {message.effect} / Damage:
            {message.value}
          </div>
        ))}
      </div>
    </>
  );
};

export default RetrospacegameadventurefightsceneResume;
