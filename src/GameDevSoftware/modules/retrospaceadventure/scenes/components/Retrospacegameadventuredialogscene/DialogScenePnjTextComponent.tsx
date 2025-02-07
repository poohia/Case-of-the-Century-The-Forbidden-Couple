import ChatGPTTypewriterEffect from "react-chatgpt-typewriter";
import { useEffect, useMemo } from "react";

import { AnimationComponent } from "../../../../../../components";
import { RetrospaceadventureCharacter } from "../../types";
import { useGameProvider } from "../../../../../../gameProvider";

type DialogScenePnjTextComponentProps = {
  character: RetrospaceadventureCharacter;
  textId: string;
  onChange: () => void;
  onFinished: () => void;
};

const DialogScenePnjTextComponent: React.FC<
  DialogScenePnjTextComponentProps
> = ({ character, textId, onFinished, onChange }) => {
  const { translateText, playSound, pauseSound } = useGameProvider();
  const finalText = useMemo(
    () => translateText(textId),
    [textId, translateText]
  );

  useEffect(() => {
    playSound("robot_talk.mp3", 0, 1, 0);
  }, []);

  return (
    <div>
      <div className="character-img">
        <AnimationComponent
          animationFile={character.animationFile}
          animationName="idle_thumbnail_animation"
          atlasFile={character.atlasFile}
          imageFile={character.image}
          center
          responsive
          blockAtMaxSize
          blockAtMinSize
        />
      </div>
      <ChatGPTTypewriterEffect
        delay={30}
        text={finalText}
        cursor={{
          width: "7px",
          height: "16px",
          marginLeft: "5px",
          fill: "white",
        }}
        hideWhenFinished={true}
        onChange={onChange}
        onFinished={() => {
          pauseSound("robot_talk.mp3", 0);
          onFinished();
        }}
      />
    </div>
  );
};

export default DialogScenePnjTextComponent;
