import ComicsArrivedCommisseriat from "./ComicsArrivedCommisseriatScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper
    data={{ ...props.data, mainMusicVolume: 0.3 }}
    sound="Visual Novel_C1_Voiture_V2_1903.wav"
  >
    <ComicsArrivedCommisseriat {...props} />
  </SceneWrapper>
);

export default Component;
