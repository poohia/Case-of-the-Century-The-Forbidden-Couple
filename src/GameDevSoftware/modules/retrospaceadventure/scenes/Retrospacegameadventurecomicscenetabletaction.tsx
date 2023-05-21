import styled from "styled-components";
import { ImgComponent, PageComponent } from "../../../../components";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameProvider } from "../../../../gameProvider";
import { BarLeftLaserComponent } from "./components/styled/Bar";
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
  padding: 5px;
  justify-content: center;
  background: transparent;
  width: 100%;
  height: 100vh;
  canvas,
  img {
    // width: 100%;
    // height: calc(100vh - 10px);
    border-radius: 10px;
    margin: 0 !important;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 14%;
  left: 43%;
  width: 15%;
  span {
    font-size: 1rem !important;
    font-weight: bold;
  }
`;

const Retrospacegameadventurecomicscenetabletaction: RetrospacegameadventurecomicscenetabletactionProps =
  (props) => {
    const {
      data: { _actions, primaryImage, texts, ...rest },
    } = props;
    const [loaded, setLoaded] = useState<boolean>(false);
    const [objective1, setObjective1] = useState<boolean>(false);
    const [objective2, setObjective2] = useState<boolean>(false);

    const {
      nextScene,
      setPrimaryFont,
      setBackgroundColor,
      env,
      innerWidth,
      innerHeight,
      translateText,
    } = useGameProvider();
    const { getAssetImg } = useAssets();

    const phaserGameContainer = useRef<HTMLDivElement>(null);
    const image = useMemo(() => {
      const img = new Image();
      img.src = getAssetImg(primaryImage);
      return img;
    }, []);

    useEffect(() => {
      setBackgroundColor(
        'url("assets/images/backgroundprimary.png") no-repeat'
      );
    }, []);

    useEffect(() => {
      if (objective2) {
        setTimeout(() => {
          nextScene(_actions[0]._scene);
        }, 1300);
      }
    }, [objective2]);

    useEffect(() => {
      if (loaded && phaserGameContainer.current) {
        const scene = new ComicTabletScene({
          width: image.naturalWidth - 10,
          height: image.naturalHeight - 10,
          primaryImage: image.src,
          env,
          texts: texts.map((text) => ({
            ...text,
            text: {
              ...text.text,
              text: translateText(text.text.text),
            },
          })),
          onTextsAllShowed: () => setObjective1(true),
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
          style={{
            maxWidth: image.naturalWidth - 10,
            maxHeight: image.naturalHeight - 10,
          }}
          id="phasergamecontent"
          ref={phaserGameContainer}
        >
          {/* {loaded && (
            <canvas
              width={image.naturalWidth}
              height={image.naturalHeight}
              ref={canvasRef}
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              style={{
                maxWidth: image.naturalWidth,
                maxHeight: image.naturalHeight,
              }}
            />
          )} */}
        </Container>
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
        <ButtonContainer>
          <RetrospaceadventureButtonComponent
            text={translateText("retrospaceadventure_tablet_interactiv_button")}
            onClick={() => setObjective2(true)}
          />
        </ButtonContainer>
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenetabletaction;
