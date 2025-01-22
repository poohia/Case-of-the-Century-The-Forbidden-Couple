import styled from "styled-components";

import { PageComponent } from "../../../../components";
import { useAssets, useScene, useVibrate } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";

import { useEffect, useMemo, useRef, useState } from "react";

import { useGameProvider } from "../../../../gameProvider";

import Phaser from "phaser";

import ComicTabletScene from "./minigames/ComicTabletScene";
import RetrospaceadventureButtonComponent from "./components/styled/RetrospaceadventureButtonComponent";

export type RetrospacegameadventurecomicscenetabletactionPropsData = {
  primaryImage: string;
  rectToClick: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  texts: {
    step: {
      moveToX: number;
      moveToY: number;
      lineToX: number;
      lineToY: number;
    }[];
    text: {
      x: number;
      y: number;
      text: string;
      width: number;
    };
  }[];
};

export type RetrospacegameadventurecomicscenetabletactionProps =
  SceneComponentProps<
    {},
    RetrospacegameadventurecomicscenetabletactionPropsData
  >;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 100%;
  height: 100vh;
  canvas {
    width: 93% !important;
    height: 93% !important;
    // height: calc(100vh - 10px) !important;
    border-radius: 10px;
    margin: 0 !important;
    max-width: 1920px;
    max-height: 1080px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 22%;
  left: 43%;
  width: 15%;
  span {
    // font-size: 1rem !important;
    font-size: 90% !important;
    font-weight: bold;
  }
`;

const Retrospacegameadventurecomicscenetabletaction: RetrospacegameadventurecomicscenetabletactionProps =
  (props) => {
    const {
      data: { _actions, primaryImage, texts, ...rest },
    } = props;
    const { nextScene } = useScene(props.data, { primarySoundVolume: 0.3 });
    const [loaded, setLoaded] = useState<boolean>(false);
    const [objective1, setObjective1] = useState<boolean>(false);
    const [objective2, setObjective2] = useState<boolean>(false);
    const {
      env,
      translateText,
      getValueFromConstant,
      preloadSound,
      playSoundEffect,
      releaseSound,
    } = useGameProvider();
    const { oneTap } = useVibrate();
    const { getAssetImg } = useAssets();

    const phaserGameContainer = useRef<HTMLDivElement>(null);
    const src = useMemo(() => getAssetImg(primaryImage), []);
    const image = useMemo(() => {
      const img = new Image();
      img.src = src;
      return img;
    }, [src]);
    const pipetipapetipoopetiSound = useMemo(
      () =>
        getValueFromConstant("retrospaceadventure_pipetipapetipoopeti_sound"),
      []
    );

    useEffect(() => {
      preloadSound(pipetipapetipoopetiSound, 1, false);
      return () => {
        releaseSound(pipetipapetipoopetiSound, 0);
      };
    }, []);

    useEffect(() => {
      if (objective2) {
        setTimeout(() => {
          nextScene();
        }, 1300);
      }
    }, [objective2]);

    useEffect(() => {
      if (loaded && phaserGameContainer.current) {
        const scene = new ComicTabletScene({
          width: image.naturalWidth - 10,
          height: image.naturalHeight - 10,
          primaryImage: src,
          env,
          texts: texts.map((text) => ({
            ...text,
            text: {
              ...text.text,
              text: translateText(text.text.text),
            },
          })),
          onTextsAllShowed: () => setObjective1(true),
          playClickSound: () => playSoundEffect(pipetipapetipoopetiSound, 1),
          vibrationOneTap: oneTap,
          ...rest,
        });
        new Phaser.Game({ ...scene.config(), scene });
      }
    }, [phaserGameContainer, loaded]);

    // check img loaded
    useEffect(() => {
      const dispatchImgLoaded = () => {
        setLoaded(true);
      };
      if (image.complete) {
        dispatchImgLoaded();
      } else {
        image.addEventListener("load", dispatchImgLoaded);
        return () => {
          image.removeEventListener("load", dispatchImgLoaded);
        };
      }
    }, []);

    return (
      <PageComponent>
        <Container
          id="phasergamecontent"
          ref={phaserGameContainer}
          // className="animate__animated animate__slideInUp animate__faster"
        ></Container>
        <RetrospaceadventureNotification
          objectives={[
            {
              content: "retrospaceadventure_tablet_interactiv_quest_1",
              active: objective1,
            },
            {
              content: "retrospaceadventure_tablet_interactiv_quest_2",
              active: objective2,
            },
          ]}
          active={objective2}
        />
        {objective1 && (
          <ButtonContainer>
            <RetrospaceadventureButtonComponent
              text={"retrospaceadventure_tablet_interactiv_button"}
              onClick={() => setObjective2(true)}
            />
          </ButtonContainer>
        )}
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenetabletaction;
