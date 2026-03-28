import SceneGifWithText from "./SceneGifWithTextScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => (
  <SceneWrapper data={props.data} sound={"Visual Novel_C1_Voiture_V2_1903.wav"}>
    <SceneGifWithText {...props} />
  </SceneWrapper>
);

export default Component;
