import styled, { ThemeProvider } from "styled-components";

import "animate.css";
import { PageComponent } from "../../../../components";
import { globalTheme } from "../theme";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import { useScene } from "../../../../hooks";
import { useGameProvider } from "../../../../gameProvider";
import { CaseoftheCenturyTheForbiddenCoupleChapterTitleProps } from "../../../game-types";
import { useEffect } from "react";

const ChapterTitleComponentContainer = styled.div<{ $backgroundUrl: string }>`
  height: 100%;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
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

  useEffect(() => {
    setTimeout(() => {
      nextScene();
    }, 3500);
  }, []);

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <ChapterTitleComponentContainer
          $backgroundUrl={getAssetImg(backgroundImage)}
          className="animate__animated animate__faster animate__fadeIn"
        >
          <TitleComponent
            onAnimationFinished={() => {}}
            titleId1={title1}
            titleId2={title2}
          />
        </ChapterTitleComponentContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default ChapterTitleComponent;
