import styled from "styled-components";

import "animate.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AnimationImgsComponent,
  ButtonClassicComponent,
  ImgComponent,
  PageComponent,
} from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import { useScene } from "../../../../hooks";
import { CaseoftheCenturyTheForbiddenCoupleChapterTitleProps } from "../../../game-types";
import PointsGameComponent from "../components/PointsGameComponent";
import usePointsGame from "../hooks/usePointsGame";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonNextSceneStyled } from "../components/ButtonMenuPauseSceneComponent";

const ChapterTitleComponentContainer = styled.div`
  height: 100%;
  /* background-size: cover; */

  > div {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PhoneInteractionContainer = styled(ButtonNextSceneStyled)`
  @keyframes phoneVibrate {
    0%,
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }

    10% {
      transform: translate3d(-2px, 0, 0) rotate(-6deg);
    }

    20% {
      transform: translate3d(2px, 0, 0) rotate(6deg);
    }

    30% {
      transform: translate3d(-3px, 0, 0) rotate(-8deg);
    }

    40% {
      transform: translate3d(3px, 0, 0) rotate(8deg);
    }

    50% {
      transform: translate3d(-2px, 0, 0) rotate(-6deg);
    }

    60% {
      transform: translate3d(2px, 0, 0) rotate(6deg);
    }

    70% {
      transform: translate3d(-1px, 0, 0) rotate(-3deg);
    }

    80% {
      transform: translate3d(1px, 0, 0) rotate(3deg);
    }
  }

  button.phone-vibrate {
    transform-origin: 50% 18%;
    animation: phoneVibrate 1.2s ease-in-out infinite;
    filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.18));
  }

  @media (prefers-reduced-motion: reduce) {
    button.phone-vibrate {
      animation: none;
      transform: none;
    }
  }
`;

export type ChapterTitleComponentProps = SceneComponentProps<
  {},
  CaseoftheCenturyTheForbiddenCoupleChapterTitleProps
>;

const ChapterTitleComponent: ChapterTitleComponentProps = (props) => {
  const {
    data: { backgroundImages, title1, title2, withPhoneInteraction },
  } = props;
  const { nextScene } = useScene(props.data);
  const { points } = usePointsGame();
  const { getValueFromConstant, phoneRingLoop, stopPhoneRingLoop } =
    useGameProvider();
  const [showMobilePhoneImage, setShowMobilePhoneImage] =
    useState<boolean>(false);

  const mobilePhoneImage = useMemo(
    () => getValueFromConstant<string>("mobile_phone_icon"),
    []
  );

  useEffect(() => {
    if (!withPhoneInteraction) {
      setTimeout(() => {
        nextScene();
      }, 3500);
    } else {
      setTimeout(() => {
        setShowMobilePhoneImage(true);
      }, 2500);
    }
  }, [withPhoneInteraction]);

  useEffect(() => {
    if (showMobilePhoneImage) {
      phoneRingLoop();
      return () => {
        stopPhoneRingLoop();
      };
    }
  }, [showMobilePhoneImage]);

  return (
    <PageComponent>
      <div>
        <AnimationImgsComponent
          imgs={backgroundImages.map((img) => img.image)}
          isBackground
          blur={5}
          forceMaxSize={false}
        />
        <PointsGameComponent points={points} />
        <ChapterTitleComponentContainer>
          <TitleComponent
            onAnimationFinished={() => {}}
            titleId1={title1}
            titleId2={title2}
          />
        </ChapterTitleComponentContainer>
        {showMobilePhoneImage && (
          <PhoneInteractionContainer>
            <ButtonClassicComponent
              onClick={() => {
                nextScene();
              }}
              visible
              animate={false}
              isIconOnly
              customClass="phone-vibrate"
            >
              <ImgComponent src={mobilePhoneImage} />
            </ButtonClassicComponent>
          </PhoneInteractionContainer>
        )}
      </div>
    </PageComponent>
  );
};

export default ChapterTitleComponent;
