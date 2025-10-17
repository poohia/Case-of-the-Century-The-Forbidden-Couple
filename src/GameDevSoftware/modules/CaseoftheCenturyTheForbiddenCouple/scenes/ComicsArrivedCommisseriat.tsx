import ComicsArrivedCommisseriat from "./ComicsArrivedCommisseriatScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper data={{ ...props.data, mainMusicVolume: 0.3 }}>
    <ComicsArrivedCommisseriat {...props} />
  </SceneWrapper>
);

export default Component;
