import styled from "styled-components";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGameProvider } from "../../../../gameProvider";
import { BarLeftLaserComponent } from "./components/styled/Bar";
import Phaser from "phaser";
import ComicTabletScene from "./minigames/ComicTabletScene";

export type RetrospacegameadventurecomicscenetabletactionPropsData = {
  primaryImage: string;
  rectToClick: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
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

const Retrospacegameadventurecomicscenetabletaction: RetrospacegameadventurecomicscenetabletactionProps =
  (props) => {
    const {
      data: { _actions, primaryImage, ...rest },
    } = props;
    const [loaded, setLoaded] = useState<boolean>(false);

    const {
      nextScene,
      setPrimaryFont,
      setBackgroundColor,
      env,
      innerWidth,
      innerHeight,
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
      if (loaded && phaserGameContainer.current) {
        const scene = new ComicTabletScene({
          width: image.naturalWidth - 10,
          height: image.naturalHeight - 10,
          primaryImage: image.src,
          env,
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
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenetabletaction;
