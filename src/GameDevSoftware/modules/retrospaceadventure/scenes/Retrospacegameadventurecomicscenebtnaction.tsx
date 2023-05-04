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
import { BarLeftLaserComponent } from "./components/styled/Bar";

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
    border-radius: 10px;
    &:nth-child(1) {
      grid-area: 1 / 1 / 6 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 6 / 7;
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

const ButtonAction = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  right: 16%;
  bottom: 5%;
  border-radius: 50%;
  width: 200px;

  > span {
    border-radius: 50%;
    &:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: hsl(0deg 0% 0% / 0.25);
      transform: translateY(4px);
    }
    &:nth-child(2) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: hsl(340deg 100% 32%);
    }
    &:nth-child(3) {
      position: relative;
      // padding: 12px 42px;
      font-size: 3rem;
      color: white;
      background: hsl(345deg 100% 47%);
      transform: translateY(-6px);
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:active {
      &:nth-child(1) {
        transform: translateY(1px);
      }
      &:nth-child(2) {
      }
      &:nth-child(3) {
        transform: translateY(-2px);
      }
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  &.active {
    > span {
      &:nth-child(1) {
        transform: translateY(1px);
      }
      &:nth-child(2) {
      }
      &:nth-child(3) {
        transform: translateY(-2px);
      }
    }
  }

  @media only screen and (max-height: 679px) {
    width: 200px;
    right: 17%;
    bottom: 10%;
    > span {
      border-radius: 50% !important;
      &:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(0deg 0% 0% / 0.25);
        transform: translateY(4px);
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(340deg 100% 32%);
      }
      &:nth-child(3) {
        font-size: 1.5rem;
        height: 80px;
      }
    }
  }

  @media only screen and (max-height: 415px) {
    width: 130px;
    right: 16%;
    bottom: 10%;
    > span {
      border-radius: 50% !important;
      &:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(0deg 0% 0% / 0.25);
        transform: translateY(4px);
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: hsl(340deg 100% 32%);
      }
      &:nth-child(3) {
        font-size: 1rem;
        height: 50px;
      }
    }
  }
`;

const LoadingBarContainer = styled(BarLeftLaserComponent)`
  position: absolute;
  width: 22%;
  height: 5%;
  bottom: 40%;
  right: 14%;
  border: 1px solid black;
`;

const Retrospacegameadventurecomicscenebtnaction: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { _actions, imageLeft, imageRight, textLeft },
    } = props;
    const { nextScene, setPrimaryFont } = useGameProvider();
    const { getAssetImg } = useAssets();
    const [showSecondImage, setShowSecondImage] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(10);
    const [canAppendPercent, setCanAppendPercent] = useState<boolean>(false);

    useEffect(() => {
      setPrimaryFont("ihtacs");
      setTimeout(() => setShowSecondImage(true), 1000);
    }, []);

    useEffect(() => {
      if (percent === 100) {
        setTimeout(() => nextScene(_actions[0]._scene), 2000);
      }
    }, [percent, _actions, nextScene]);

    useEffect(() => {
      if (canAppendPercent && showSecondImage && percent < 100) {
        setTimeout(() => setPercent(percent + 0.5), 50 / (percent + 0.5));
      } else if (
        !canAppendPercent &&
        showSecondImage &&
        percent > 10 &&
        percent < 100
      ) {
        setTimeout(() => setPercent(percent - 1), 500 / (percent + 1));
      }
    }, [percent, showSecondImage, canAppendPercent]);

    return (
      <PageComponent>
        <Container>
          <div className="animate__animated animate__zoomIn">
            <ImgComponent src={getAssetImg(imageLeft)} />
          </div>
          {showSecondImage && (
            <>
              <div className="animate__animated animate__zoomIn">
                <ImgComponent src={getAssetImg(imageRight)} />
              </div>
              <TextLeft>
                <TranslationComponent id={textLeft} />
              </TextLeft>
            </>
          )}
        </Container>
        {showSecondImage && (
          <>
            <RetrospaceadventureNotification
              active={percent === 100}
              objectives={[
                {
                  content:
                    "retrospaceadventure_notification_rise_subject_content_1",
                },
              ]}
            />
            <LoadingBarContainer
              percentLife={percent}
              className="animate__animated animate__bounceIn animate__delay-1s"
            >
              <div />
              <div>
                <span>Loading.....</span>
              </div>
              <div />
            </LoadingBarContainer>
            <ButtonAction
              className={`animate__animated animate__bounceIn animate__delay-1s ${
                percent === 100 ? "active" : ""
              }`}
              onMouseDown={() => setCanAppendPercent(true)}
              onMouseUp={() => setCanAppendPercent(false)}
              onTouchStart={() => setCanAppendPercent(true)}
              onTouchEnd={() => setCanAppendPercent(false)}
            >
              <span></span>
              <span></span>
              <span>
                Push <br /> me
              </span>
            </ButtonAction>
          </>
        )}
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenebtnaction;
