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
import { useEffect, useState } from "react";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurecomicscenebtnPropsData = {
  imageLeft: string;
  imageRight: string;
  textLeft: string;
};

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenebtnPropsData
>;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background: black;
  background: url("assets/images/backgroundprimary.png");
  background-size: cover;
  height: 100%;
  padding: 5px;
  > div {
    margin: 2%;
    border: 3.5px solid black;
    border-radius: 10px;
    &:nth-child(1) {
      grid-area: 1 / 1 / 6 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 6 / 7;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const TextLeft = styled.div`
  position: absolute;
  width: 10%;
  height: 22%;
  left: 8.5%;
  top: 26%;
  font-size: 100%;
  border: none !important;
  margin: 0 !important;
  text-align: center;
`;

const Retrospacegameadventurecomicscenebtnaction: RetrospacegameadventurecomicsceneProps =
  (props) => {
    console.log(props);
    const {
      data: { _actions, imageLeft, imageRight, textLeft },
    } = props;
    const { nextScene, setPrimaryFont } = useGameProvider();
    const { getAssetImg } = useAssets();
    const [showSecondImage, setShowSecondImage] = useState<boolean>(false);
    const [btnPressed, setBtnPressed] = useState<boolean>(false);

    useEffect(() => {
      setPrimaryFont("ihtacs");
      setTimeout(() => setShowSecondImage(true), 1500);
    }, []);

    useEffect(() => {
      if (btnPressed) {
        setTimeout(() => nextScene(_actions[0]._scene), 800);
      }
    }, [btnPressed]);

    return (
      <PageComponent>
        <Container>
          <div className="animate__animated animate__zoomIn">
            <ImgComponent src={getAssetImg(imageLeft)} />
          </div>
          {showSecondImage && (
            <>
              <div
                className="animate__animated animate__zoomIn"
                onClick={() => setBtnPressed(true)}
              >
                <ImgComponent src={getAssetImg(imageRight)} />
              </div>
              <TextLeft>
                <TranslationComponent id={textLeft} />
              </TextLeft>
            </>
          )}
        </Container>
        {showSecondImage && (
          <RetrospaceadventureNotification
            active={btnPressed}
            objectives={[
              {
                content:
                  "retrospaceadventure_notification_rise_subject_content_1",
              },
            ]}
          />
        )}
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenebtnaction;
