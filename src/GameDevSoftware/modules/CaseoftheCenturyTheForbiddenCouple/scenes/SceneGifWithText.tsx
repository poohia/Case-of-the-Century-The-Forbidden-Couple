import SceneGifWithText from "./SceneGifWithTextScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper data={props.data}>
    <SceneGifWithText {...props} />
  </SceneWrapper>
);

export default Component;
