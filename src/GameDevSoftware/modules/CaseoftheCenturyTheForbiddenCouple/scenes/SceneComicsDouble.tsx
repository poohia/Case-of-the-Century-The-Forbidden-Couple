import SceneComicsDouble from "./SceneComicsDoubleScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper data={props.data}>
    <SceneComicsDouble {...props} />
  </SceneWrapper>
);

export default Component;
