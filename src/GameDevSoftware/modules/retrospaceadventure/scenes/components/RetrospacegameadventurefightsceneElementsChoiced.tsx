import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
// import { ContainerRowFightCenter } from "./RetrospacegameadventurefightsceneStyledComponents";
import { CardWithEffect } from "./styled/Card";
// import styled from "styled-components";
// import AnimationScene from "../minigames/AnimationScene";
// import { useGameProvider } from "../../../../../gameProvider";
// import { useAssets } from "../../../../../hooks";
import useRetrospacegameadventurefightsceneUtils from "../hooks/useRetrospacegameadventurefightsceneUtils";
import { EffectStateType, TurnStatus } from "../types";
import RetrospaceadventureBarLifeAnimationContext from "../contexts/RetrospaceadventureBarLifeAnimationContext";
import styled from "styled-components";
import { AnimationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { calculResultPercent } from "../utils";

// const AnimationContainer = styled.div`
//   position: Absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   z-index: 999;
// `;
const RetrospacegameadventurefightsceneElementsChoicedContainer = styled.div`
  display: flex;
  position: Absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  > div {
    flex: 1;
    &:nth-child(2) {
      flex: 2;
    }
  }
`;
// const AnimationContainer = styled.div`
//   position: Absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   z-index: 9;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   > div {
//     flex-basis: 45%;
//     margin: 2%;
//     width: 40%;
//     height: 80%;
//     display: flex;
//     align-items: center;
//     &:nth-child(1) {
//       justify-content: flex-start;
//     }
//     &:nth-child(2) {
//       justify-content: flex-end;
//     }
//   }
// `;
const ContainerRowFight = styled.div<{ howWin: TurnStatus }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  > div {
    flex: 1;
    &:nth-child(1) {
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        ${({ howWin }) =>
          howWin === "win"
            ? `left: 100%;transform: rotate(180deg);`
            : `right: 100%;`}
      }
    }
    &:nth-child(2) {
      &:after {
        content: "";
        position: absolute;
        top: 50%;

        margin-top: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        ${({ howWin }) =>
          howWin === "win"
            ? `right: 100%;`
            : `left: 100%;transform: rotate(180deg);`}
      }
    }
  }
`;

const RetrospacegameadventurefightsceneElementsChoiced: React.FC = () => {
  // const [phaserScene, setPhaserScene] = useState<Phaser.Game | null>(null);
  // const [scene, setScene] = useState<AnimationScene | null>(null);
  // const [createdDone, setCreatedDone] = useState<boolean>(false);
  const [messages, setMessages] = useState<EffectStateType[]>([]);
  const {
    stateGame: { howWin, effectState },
    Hero,
    Enemy,
    dispatchGame,
  } = useContext(RetrospaceadventureGameContext);
  const { animationEnemy, animationHero } = useContext(
    RetrospaceadventureBarLifeAnimationContext
  );
  const { innerHeight, innerWidth } = useGameProvider();

  // const { preloadSound, playSound } = useGameProvider();
  // const { getAssetImg, getConfigurationFile } = useAssets();
  const {
    findCardHeroById,
    findCardEnemyById,
    // findEffectHeroByIdAndHowWin,
    // findEffectEnemyByIdAndHowWin,
  } = useRetrospacegameadventurefightsceneUtils();
  // const phaserAnimationContainer = useRef<HTMLDivElement>(null);

  const cardHero = useMemo(() => findCardHeroById(), [findCardHeroById]);
  const cardEnemy = useMemo(() => findCardEnemyById(), [findCardEnemyById]);
  const lasMessage = useMemo(
    () => (messages.length > 0 ? messages[messages.length - 1] : null),
    [messages]
  );
  // const effectHero = useMemo(
  //   () => findEffectHeroByIdAndHowWin(),
  //   [findEffectHeroByIdAndHowWin]
  // );
  // const effectEnemy = useMemo(
  //   () => findEffectEnemyByIdAndHowWin(),
  //   [findEffectEnemyByIdAndHowWin]
  // );

  useEffect(() => {
    setTimeout(() => {
      dispatchGame({ type: "applyEffects" });
    }, 1500);
  }, [dispatchGame]);

  // useEffect(() => {
  //   if (phaserAnimationContainer && phaserAnimationContainer.current) {
  //     const {
  //       current: { clientWidth: width, clientHeight: height },
  //     } = phaserAnimationContainer;

  //     const s = new AnimationScene({
  //       width,
  //       height,
  //       animations: [
  //         {
  //           phaserAnimation: getConfigurationFile(effectEnemy.animation),
  //           atlas: getConfigurationFile(effectEnemy.atlas),
  //           atlasName: effectEnemy.atlasName,
  //           image: getAssetImg(effectEnemy.image),
  //           position: "left",
  //         },
  //         {
  //           phaserAnimation: getConfigurationFile(effectHero.animation),
  //           atlas: getConfigurationFile(effectHero.atlas),
  //           atlasName: effectHero.atlasName,
  //           image: getAssetImg(effectHero.image),
  //           position: "right",
  //         },
  //       ],
  //       loadSound: preloadSound,
  //       playSound,
  //       onCreated: () => setCreatedDone(true),
  //     });
  //     setScene(s);
  //     setPhaserScene(new Phaser.Game({ ...s.config(), scene: s }));
  //   }
  // }, [phaserAnimationContainer]);

  useEffect(() => {
    if (!effectState) return;
    setMessages((_messages) => {
      return [..._messages, effectState];
    });
  }, [effectState]);

  // useEffect(() => {
  //   return () => {
  //     phaserScene?.destroy(false);
  //   };
  // }, [phaserScene]);

  // useEffect(() => {
  //   if (messages.length === 1 && howWin === "win" && createdDone) {
  //     scene?.appendRightAnimation();
  //   } else if (messages.length === 1 && howWin === "loose" && createdDone) {
  //     scene?.appendLeftAnimation();
  //   } else if (messages.length === 2 && howWin === "win" && createdDone) {
  //     scene?.appendLeftAnimation();
  //   } else if (messages.length === 2 && howWin === "loose" && createdDone) {
  //     scene?.appendRightAnimation();
  //   }
  // }, [messages, scene, createdDone, howWin]);

  useEffect(() => {
    // setCreatedDone(false);
    setMessages([]);
  }, []);

  if (!cardHero || !cardEnemy || !howWin) return <div />;

  return (
    <RetrospacegameadventurefightsceneElementsChoicedContainer>
      {/* <AnimationContainer
        id="animationcontent"
        ref={phaserAnimationContainer}
      /> */}
      <AnimationComponent
        className="animate__animated animate__fadeInLeft animate__fast"
        animationFile={Enemy.animationFile}
        atlasFile={Enemy.atlasFile}
        imageFile={Enemy.image}
        animationName={animationEnemy}
        center={true}
        responsive={true}
        blockAtMaxSize
        // minSize={{ w: 250, h: 280 }}
      />

      <ContainerRowFight howWin={howWin}>
        {howWin === "win" ? (
          <>
            <CardWithEffect
              active={
                lasMessage
                  ? lasMessage.message.toLocaleLowerCase().includes("hero")
                  : false
              }
              effect={"critical"}
              card={cardHero}
            />
            <CardWithEffect
              active={
                lasMessage
                  ? lasMessage.message.toLocaleLowerCase().includes("enemy")
                  : false
              }
              effect={"echec"}
              card={cardEnemy}
            />
          </>
        ) : (
          <>
            <CardWithEffect
              active={
                lasMessage
                  ? lasMessage.message.toLocaleLowerCase().includes("enemy")
                  : false
              }
              effect={"critical"}
              card={cardEnemy}
            />
            <CardWithEffect
              active={
                lasMessage
                  ? lasMessage.message.toLocaleLowerCase().includes("hero")
                  : false
              }
              effect={"echec"}
              card={cardHero}
            />
          </>
        )}
      </ContainerRowFight>
      <AnimationComponent
        className="animate__animated animate__fadeInRight animate__fast"
        animationFile={Hero.animationFile}
        atlasFile={Hero.atlasFile}
        imageFile={Hero.image}
        animationName={animationHero}
        center={false}
        responsive={true}
        blockAtMaxSize
      />
    </RetrospacegameadventurefightsceneElementsChoicedContainer>
  );
};

export default RetrospacegameadventurefightsceneElementsChoiced;
