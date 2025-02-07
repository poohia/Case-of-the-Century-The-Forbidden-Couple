import { useCallback, useState } from "react";

import {
  AnimationComponent,
  TranslationComponent,
} from "../../../../../../components";
import { RetrospaceadventureCharacter } from "../../types";
import { DialogResponsesContainer } from "./RetrospacegameadventuredialogsceneStyledComponents";
import { useVibrate } from "../../../../../../hooks";

type DialogSceneCharacterComponentProps = {
  baseKey: string;
  character: RetrospaceadventureCharacter;
  onFinished: (text: string, isEnd: boolean) => void;
  dialog: {
    response: string;
    textResponse: string;
    isNextActionResponse?: boolean;
  }[];
};
const DialogSceneCharacterComponent: React.FC<
  DialogSceneCharacterComponentProps
> = (props: DialogSceneCharacterComponentProps) => {
  const { baseKey, dialog, character, onFinished } = props;
  const [response, setResponse] = useState<string | null>(null);
  const [beforeNext, setBeforeNext] = useState<boolean>(false);

  const { oneTap } = useVibrate();

  const handleClickResponse = useCallback(
    (dialog: {
      response: string;
      textResponse: string;
      isNextActionResponse?: boolean;
    }) => {
      oneTap();
      if (dialog.isNextActionResponse && !beforeNext) {
        setBeforeNext(true);
      } else {
        setResponse(dialog.response);
        onFinished(dialog.textResponse, !!dialog.isNextActionResponse);
      }
    },
    [beforeNext]
  );

  if (response) {
    return (
      <DialogResponsesContainer className="response">
        <div>
          <p>
            &nbsp; <TranslationComponent id={response} />
          </p>
        </div>
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
      </DialogResponsesContainer>
    );
  }

  return (
    <DialogResponsesContainer>
      <div>
        {dialog.map((d, i) => (
          <p
            key={`${baseKey}-response-${i}`}
            onClick={() => {
              handleClickResponse(d);
            }}
            className={`${d.isNextActionResponse ? "action-next-scene" : ""} ${beforeNext ? "active" : ""}`}
          >
            {d.isNextActionResponse ? (
              <span>&#x27A5;</span>
            ) : (
              <span>&gt;&nbsp;</span>
            )}
            &nbsp; <TranslationComponent id={d.response} />
          </p>
        ))}
      </div>
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
    </DialogResponsesContainer>
  );
};

export default DialogSceneCharacterComponent;
