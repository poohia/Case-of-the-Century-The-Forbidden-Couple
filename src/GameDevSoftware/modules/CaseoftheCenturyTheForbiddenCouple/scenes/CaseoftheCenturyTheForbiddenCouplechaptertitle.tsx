import styled from "styled-components";

import "animate.css";
import { useEffect } from "react";

import { PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import { useScene } from "../../../../hooks";
import { useGameProvider } from "../../../../gameProvider";
import { CaseoftheCenturyTheForbiddenCoupleChapterTitleProps } from "../../../game-types";
import PointsGameComponent from "../components/PointsGameComponent";
import usePointsGame from "../hooks/usePointsGame";

const ChapterTitleComponentContainer = styled.div<{ $backgroundUrl: string }>`
  height: 100%;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;
  > div {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
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
    data: { backgroundImage, title1, title2 },
  } = props;
  const { getAssetImg } = useGameProvider();
  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
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
        <PointsGameComponent points={points} />
        <ChapterTitleComponentContainer
          $backgroundUrl={getAssetImg(backgroundImage)}
        >
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
