import {
  ImgBackgroundComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../../components";
import { SceneComponentProps } from "../../../../../types";
import { ResumedEndSceneSceneProps } from "../../../../game-types";

const ResumedEndSceneScene: SceneComponentProps<
  {},
  ResumedEndSceneSceneProps
> = (props) => {
  const {
    data: { backgroundImage, srDescription },
  } = props;

  return (
    <PageComponent>
      <TranslationComponent srOnly id={srDescription} />
      <ImgBackgroundComponent src={backgroundImage} />
    </PageComponent>
  );
};

export default ResumedEndSceneScene;
