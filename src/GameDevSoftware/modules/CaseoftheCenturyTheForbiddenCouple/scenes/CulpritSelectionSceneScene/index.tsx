import { useContext, useEffect, useState } from "react";

import { useScene, useTimeout } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { CulpritSelectionSceneProps } from "../../../../game-types";
import PointsGameComponent from "../../components/PointsGameComponent";
import PointsContext from "../../contexts/PointsContext";
import { ImgBackgroundComponent } from "../../../../../components";
import ModalCulpritSelection from "../../modals/ModalCulpritSelection";

const CulpritSelectionScene: SceneComponentProps<
  {},
  CulpritSelectionSceneProps
> = (props) => {
  const { nextScene: nextSceneUseScene } = useScene(props.data);
  const { points, addPoints } = useContext(PointsContext);
  const { backgroundImage } = props.data;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  console.log("🚀 ~ CulpritSelectionScene ~ props:", props);
  const { start } = useTimeout(() => {
    setOpenDialog(true);
  }, 1700);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <>
      <PointsGameComponent points={points} />
      <ImgBackgroundComponent
        src={backgroundImage}
        className="animate__animated animate__fadeIn"
      />
      <ModalCulpritSelection open={openDialog} />
    </>
  );
};

export default CulpritSelectionScene;
