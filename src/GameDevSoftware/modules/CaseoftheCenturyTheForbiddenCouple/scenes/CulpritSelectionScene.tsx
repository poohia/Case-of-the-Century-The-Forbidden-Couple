import CulpritSelectionScene from "./CulpritSelectionSceneScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => {
  return (
    <SceneWrapper data={props.data}>
      <CulpritSelectionScene {...props} />
    </SceneWrapper>
  );
};

export default Component;
