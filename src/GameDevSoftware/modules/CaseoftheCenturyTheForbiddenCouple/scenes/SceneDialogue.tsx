import { useState } from "react";

import SceneDialogue from "./SceneDialogueScene";
import SceneWrapper from "./SceneWrapper";

const Component = (props: any) => {
  const [resetKey, setResetKey] = useState<number>(0);

  return (
    <SceneWrapper data={props.data}>
      <SceneDialogue
        {...props}
        key={resetKey}
        resetKey={() => {
          setResetKey((prev) => prev + 1);
        }}
      />
    </SceneWrapper>
  );
};

export default Component;
