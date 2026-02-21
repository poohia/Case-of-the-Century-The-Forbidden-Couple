import styled from "styled-components";

import "animate.css";
import { useEffect } from "react";

import { ImgBackgroundComponent, PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import { useScene } from "../../../../hooks";
import { SceneChapitreUnProps } from "../../../game-types";

const ChapterTitleComponentContainer = styled.div`
  height: 100%;
  backdrop-filter: blur(4px);
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

export type SceneChapitreUnComponentProps = SceneComponentProps<
  {},
  SceneChapitreUnProps
>;

const SceneChapitreUn: SceneChapitreUnComponentProps = (props) => {
  const {
    data: { backgroundImages, title1, title2 },
  } = props;
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
    }, 5000);
  }, []);

  return (
    <PageComponent maxSize={{ width: 1920, height: 1080 }}>
      <div>
        <ImgBackgroundComponent src={backgroundImages} />

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

export default SceneChapitreUn;
