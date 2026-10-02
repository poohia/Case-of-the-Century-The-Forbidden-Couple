import { useEffect } from "react";

import { ImgBackgroundComponent, PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import TitleComponent from "../components/TitleComponent";
import {
  PaperSheetChapter,
  PaperSheetChapterTitle,
  PaperSheetOverlay,
} from "../components/PaperSheetComponent";
import { useScene } from "../../../../hooks";
import { SceneChapitreUnProps } from "../../../game-types";

export type SceneChapitreUnComponentProps = SceneComponentProps<
  {},
  SceneChapitreUnProps
>;

const SceneChapitreUn: SceneChapitreUnComponentProps = (props) => {
  const {
    data: { backgroundImages, title1, title2 },
  } = props;
  const { nextScene } = useScene(props.data);

  useEffect(() => {
    setTimeout(() => {
      nextScene();
    }, 5000);
  }, []);

  return (
    <PageComponent>
      <div>
        <ImgBackgroundComponent
          src={backgroundImages}
          forceMaxSize={false}
          blur={5}
        />

        <PaperSheetOverlay className="animate__animated animate__fadeIn">
          <PaperSheetChapter>
            <PaperSheetChapterTitle>
              <TitleComponent
                onAnimationFinished={() => {}}
                titleId1={title1}
                titleId2={title2}
              />
            </PaperSheetChapterTitle>
          </PaperSheetChapter>
        </PaperSheetOverlay>
      </div>
    </PageComponent>
  );
};

export default SceneChapitreUn;
