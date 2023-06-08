import { useEffect, useState, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ImgComponent, PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";
import { fightTheme, globalTheme } from "./themes";
import {
  BarLeftComponent,
  BarLeftLaserComponent,
} from "./components/styled/Bar";
import { calculPercent } from "./utils";

type RetrospacegameadventurecomicscenestartenginePropsData = {
  imageEngine: string;
  videoEngine: string;
  gearStick: string;
};

export type RetrospacegameadventurecomicscenestartengineProps =
  SceneComponentProps<
    {},
    RetrospacegameadventurecomicscenestartenginePropsData
  >;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 100%;
  background: url("assets/images/backgroundprimary.png");
  > div {
    // &:nth-child(1) {
    //   display: none;
    //   video {
    //     width: 101%;
    //     height: 101%;
    //     object-fit: cover;
    //     object-position: center;
    //   }
    // }
    &:nth-child(1) {
      flex: 3;
      height: 100%;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        bottom: 12px;
        border-radius: 3px;
        height: 96%;
      }
    }
    &:nth-child(2) {
      flex: 2;
      position: relative;
      height: 100%;
    }
  }
`;

const EngineComponent = styled.div`
  width: 98%;
  height: 96%;
  background-color: grey;
  position: absolute;
  bottom: 12px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > div {
    &:nth-child(3) {
      width: 100%;
    }
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  color: white;
  position: relative;
  > div {
    // width: 100%;
    margin: 3px 0px;
    &:nth-child(2),
    &:nth-child(3) {
      align-self: start;
      width: 90%;
      margin-left: 5%;
      div {
        // width: 90%;
      }
    }
  }
`;

const StartStopButton = styled.button<{ disabled: boolean }>`
  padding: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-left: 10%;
  border: none;
  box-shadow: ${({ disabled, theme }) =>
    disabled
      ? `${theme.card.firstBorderSecondary} 5px 5px, ${theme.card.secondBorderSecondary} 10px 10px`
      : `${theme.card.firstBorderPrimary} 5px 5px, ${theme.card.secondBorderPrimary} 10px 10px`};
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.secodary : theme.colors.primary};
  border-radius: 3px;
  color: white;
  font-weigh: bold;
  margin-bottom: 15px;
  > span {
    &:nth-child(2) {
      font-size: ${({ disabled }) => (disabled ? "0.9rem" : "1.3rem")};
    }
    &:nth-child(1) {
      font-size: ${({ disabled }) => (disabled ? "1.3rem" : "0.9rem")};
    }
  }
  ${({ disabled }) =>
    disabled
      ? ``
      : `
    cursor: pointer;
  `}
`;

const PowerBarContainer = styled(BarLeftLaserComponent)`
  width: 100% !important;
  color: black;
`;

const SpeedBarContainer = styled(BarLeftComponent)`
  width: 100% !important;
  color: white;
  > div {
    &:nth-child(3) {
      width: 100px !important;
    }
  }
`;

const GearStickContainer = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    width: 60%;
    bottom: 0;
    left: 20%;
    cursor: grab;
  }
`;

let isDragging = false;
let RetrospacegameadventurecomicscenestartengineStartY = 0;
let RetrospacegameadventurecomicscenestartengineStartTop = 0;
let RetrospacegameadventurecomicscenestartengineStartMaxTop = false;

const Retrospacegameadventurecomicscenestartengine: RetrospacegameadventurecomicscenestartengineProps =
  (props) => {
    const {
      data: { _actions, imageEngine, videoEngine, gearStick },
    } = props;
    const [started, setStarted] = useState<boolean>(false);
    const [percentSpeed, setPercentSpeed] = useState<number>(0);
    const gearStickContainerRef = useRef<HTMLDivElement>(null);
    const gearStickRef = useRef<HTMLImageElement>(null);
    const {
      nextScene,
      setPrimaryFont,
      playSoundWithPreload,
      preloadSound,
      stopSound,
    } = useGameProvider();

    useEffect(() => {
      setPrimaryFont("ihtacs");
      playSoundWithPreload("LaserGroove.mp3", 0.8);
      // preloadSound(loadingBarSound, 1, false);
      // return () => {
      //   stopSound(loadingBarSound, 0, false);
      // };
    }, []);

    useEffect(() => {
      if (started && gearStickRef.current && gearStickContainerRef.current) {
        const { current: image } = gearStickRef;
        const { current: container } = gearStickContainerRef;

        const mouseDownComputer = (e: MouseEvent) => {
          isDragging = true;
          RetrospacegameadventurecomicscenestartengineStartY = e.clientY;
          RetrospacegameadventurecomicscenestartengineStartTop =
            image.offsetTop;
        };

        const mouseDownAndTouchend = () => {
          isDragging = false;
        };

        const mouseMove = (e: MouseEvent) => {
          if (
            isDragging &&
            !RetrospacegameadventurecomicscenestartengineStartMaxTop
          ) {
            const deltaY =
              e.clientY - RetrospacegameadventurecomicscenestartengineStartY;
            const newTop =
              RetrospacegameadventurecomicscenestartengineStartTop + deltaY;
            const containerHeight = container.offsetHeight;
            const imageHeight = image.offsetHeight;

            if (newTop >= 0 && newTop + imageHeight <= containerHeight) {
              image.style.top = newTop + "px";
            }
            let p = calculPercent(image.offsetTop, containerHeight);
            if (p < 1) {
              setPercentSpeed(100);
            } else {
              setPercentSpeed(100 - p);
            }
          }
        };

        image.addEventListener("mousedown", mouseDownComputer);

        document.addEventListener("mouseup", mouseDownAndTouchend);

        document.addEventListener("mousemove", mouseMove);

        const touchStart = (e: TouchEvent) => {
          isDragging = true;
          RetrospacegameadventurecomicscenestartengineStartY =
            e.touches[0].clientY;
          RetrospacegameadventurecomicscenestartengineStartTop =
            image.offsetTop;
        };

        const touchMove = (e: TouchEvent) => {
          if (
            isDragging &&
            !RetrospacegameadventurecomicscenestartengineStartMaxTop
          ) {
            const deltaY =
              e.touches[0].clientY -
              RetrospacegameadventurecomicscenestartengineStartY;
            const newTop =
              RetrospacegameadventurecomicscenestartengineStartTop + deltaY;
            const containerHeight = container.offsetHeight;
            const imageHeight = image.offsetHeight;

            if (newTop >= 0 && newTop + imageHeight <= containerHeight) {
              image.style.top = newTop + "px";
            }

            let p = calculPercent(image.offsetTop, containerHeight);
            if (p < 1) {
              setPercentSpeed(100);
            } else {
              setPercentSpeed(100 - p);
            }
          }
        };

        image.addEventListener("touchstart", touchStart);

        document.addEventListener("touchend", mouseDownAndTouchend);

        document.addEventListener("touchmove", touchMove);

        return () => {
          RetrospacegameadventurecomicscenestartengineStartY = 0;
          RetrospacegameadventurecomicscenestartengineStartTop = 0;
          image.removeEventListener("mousedown", mouseDownComputer);

          document.removeEventListener("mouseup", mouseDownAndTouchend);

          document.removeEventListener("mousemove", mouseMove);

          image.addEventListener("touchstart", touchStart);

          document.addEventListener("touchend", mouseDownAndTouchend);

          document.addEventListener("touchmove", touchMove);
        };
      }
    }, [started, gearStickRef, gearStickContainerRef]);

    useEffect(() => {
      if (percentSpeed === 100) {
        RetrospacegameadventurecomicscenestartengineStartMaxTop = true;
      }
    }, [percentSpeed]);

    return (
      <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
        <PageComponent>
          <Container>
            <div>
              <ImgComponent src={imageEngine} />
            </div>

            <div>
              <EngineComponent>
                <StatusContainer>
                  <div>
                    <span>Status: {started ? "On" : "Off"}</span>
                  </div>
                  <div>
                    <PowerBarContainer percentLife={started ? 100 : 0}>
                      <div />
                      <div>
                        <span>Power.....</span>
                      </div>
                      <div />
                    </PowerBarContainer>
                  </div>
                  <div>
                    <SpeedBarContainer
                      percentLife={percentSpeed}
                      percentDuration={0}
                    >
                      <div />
                      <div>
                        <span>Speed.....</span>
                      </div>
                      <div />
                    </SpeedBarContainer>
                  </div>
                </StatusContainer>
                <GearStickContainer ref={gearStickContainerRef}>
                  {started && (
                    <ImgComponent
                      src={gearStick}
                      className={`animate__animated animate__bounceIn animate__delay-1s `}
                      ref={gearStickRef}
                    />
                  )}
                </GearStickContainer>
                <div>
                  <StartStopButton
                    disabled={started}
                    onClick={() => setStarted(true)}
                  >
                    <span>Start</span>

                    <span>Stop</span>
                  </StartStopButton>
                </div>
              </EngineComponent>
            </div>
          </Container>
          <RetrospaceadventureNotification
            active={percentSpeed === 100}
            objectives={[
              {
                content: "retrospaceadventure_notification_engine_started",
                active: percentSpeed === 100,
              },
            ]}
          />
        </PageComponent>
      </ThemeProvider>
    );
  };

export default Retrospacegameadventurecomicscenestartengine;
