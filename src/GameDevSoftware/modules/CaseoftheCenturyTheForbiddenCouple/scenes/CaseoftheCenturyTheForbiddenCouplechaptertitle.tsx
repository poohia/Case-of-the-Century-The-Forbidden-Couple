import styled from "styled-components";

import "animate.css";
import { useEffect, useMemo, useState } from "react";

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
  background-size: cover;
  backdrop-filter: blur(5px);
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
  const { getValueFromConstant } = useGameProvider();
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

  return (
    <PageComponent>
      <div>
        <AnimationImgsComponent
          imgs={backgroundImages.map((img) => img.image)}
          isBackground
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
          <ButtonNextSceneStyled>
            <ButtonClassicComponent
              onClick={() => {
                nextScene();
              }}
              visible
              isIconOnly
              customClass={"animate__animated animate__headShake"}
            >
              <ImgComponent src={mobilePhoneImage} />
            </ButtonClassicComponent>
          </ButtonNextSceneStyled>
        )}
      </div>
    </PageComponent>
  );
};

export default ChapterTitleComponent;
