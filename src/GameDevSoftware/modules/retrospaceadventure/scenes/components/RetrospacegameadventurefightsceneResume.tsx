import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Phaser from "phaser";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { EffectStateType } from "../types";
import styled from "styled-components";
import AnimationScene from "../minigames/AnimationScene";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";

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
  const {
    stateGame: { effectState },
  } = useContext(RetrospaceadventureGameContext);
  const { preloadSound, playSound } = useGameProvider();
  const { getAssetImg, getConfigurationFile } = useAssets();
  const phaserAnimationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!effectState) return;
    setMessages((_messages) => {
      return [..._messages, effectState];
    });
    console.log("dispatch");
    // setTimeout(() => {
    //   document.dispatchEvent(new Event("test"));
    // }, 3000);
    // premier message part avant le preload de la scene
    document.dispatchEvent(new Event("test"));
  }, [effectState]);

  useEffect(() => {
    if (phaserAnimationContainer && phaserAnimationContainer.current) {
      const {
        current: { clientWidth: width, clientHeight: height },
      } = phaserAnimationContainer;
      console.log("i'm here");
      const scene = new AnimationScene({
        width,
        height,
        animations: getConfigurationFile("laser_anim.json"),
        animation: {
          image: getAssetImg("laser.png"),
          atlas: getConfigurationFile("laser_atlas.json"),
          position: "left",
        },
        loadSound: preloadSound,
        playSound,
      });
      setPhaserScene(new Phaser.Game({ ...scene.config(), scene }));
    }
  }, [phaserAnimationContainer]);

  useEffect(() => {
    setMessages([]);
    // setScene(null);
  }, []);

  useEffect(() => {
    return () => {
      phaserScene?.destroy(false);
    };
  }, [phaserScene]);

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
