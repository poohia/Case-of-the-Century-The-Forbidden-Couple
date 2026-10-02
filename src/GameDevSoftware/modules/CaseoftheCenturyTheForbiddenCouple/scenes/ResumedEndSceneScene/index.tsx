import { useEffect, useState } from "react";

import { ImgBackgroundComponent } from "../../../../../components";
import { useScene, useTimeout } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { ResumedEndSceneSceneProps } from "../../../../game-types";
import ModalResumedEnd from "../../modals/ModalResumedEnd";

const OVERLAY_DELAY = 1000;

const ResumedEndSceneScene: SceneComponentProps<
  {},
  ResumedEndSceneSceneProps
> = (props) => {
  const {
    data: { backgroundImage, srDescription, goodScenario },
  } = props;
  const { nextScene } = useScene(props.data);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { start } = useTimeout(() => {
    setOpenDialog(true);
  }, OVERLAY_DELAY);

  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <ImgBackgroundComponent
        className="animate__animated animate__fadeIn"
        src={backgroundImage}
      />
      <ModalResumedEnd
        open={openDialog}
        goodScenario={goodScenario}
        srDescription={srDescription}
        onFinished={() => {
          nextScene();
        }}
      />
    </>
  );
};

export default ResumedEndSceneScene;
