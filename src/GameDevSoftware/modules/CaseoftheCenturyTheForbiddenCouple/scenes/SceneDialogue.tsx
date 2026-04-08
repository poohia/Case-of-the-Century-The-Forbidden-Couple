import SceneDialogue from "./SceneDialogueScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => {
  return (
    <SceneWrapper data={props.data}>
      <SceneDialogue {...props} />
    </SceneWrapper>
  );
};

export default Component;
