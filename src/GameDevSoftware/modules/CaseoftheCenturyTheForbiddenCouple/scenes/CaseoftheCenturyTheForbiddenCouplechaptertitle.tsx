import styled from "styled-components";

import "animate.css";
import { useEffect } from "react";

import { AnimationImgsComponent, PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import { useScene } from "../../../../hooks";
import { CaseoftheCenturyTheForbiddenCoupleChapterTitleProps } from "../../../game-types";
import PointsGameComponent from "../components/PointsGameComponent";
import usePointsGame from "../hooks/usePointsGame";

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
    data: { backgroundImages, title1, title2 },
  } = props;
  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "Visual Novel_C1_Voiture_V2_1903.wav",
        volume: 0.4,
      },
    ],
  });
  const { points } = usePointsGame();

  useEffect(() => {
    setTimeout(() => {
      nextScene();
    }, 3500);
  }, []);

  return (
    <PageComponent maxSize={{ width: 1920, height: 1080 }}>
      <div>
        <AnimationImgsComponent
          imgs={backgroundImages.map((img) => img.image)}
          isBackground
        />
        <PointsGameComponent points={points} />
        <ChapterTitleComponentContainer>
          <TitleComponent
            onAnimationFinished={() => {}}
            titleId1={title1}
            titleId2={title2}
          />
        </ChapterTitleComponentContainer>
      </div>
    </PageComponent>
  );
};

export default ChapterTitleComponent;
