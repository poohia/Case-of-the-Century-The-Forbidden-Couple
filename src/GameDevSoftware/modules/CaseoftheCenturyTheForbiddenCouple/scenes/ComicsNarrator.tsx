import ComicsNarrator from "./ComicsNarratorScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper data={props.data}>
    <ComicsNarrator {...props} />
  </SceneWrapper>
);

export default Component;
