import ResumedEndSceneScene from "./ResumedEndSceneScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => {
  return (
    <SceneWrapper data={props.data}>
      <ResumedEndSceneScene {...props} />
    </SceneWrapper>
  );
};

export default Component;
