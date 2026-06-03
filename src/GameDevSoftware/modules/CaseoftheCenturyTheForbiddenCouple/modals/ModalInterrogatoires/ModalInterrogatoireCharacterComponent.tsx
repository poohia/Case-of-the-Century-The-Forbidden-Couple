import { useMemo } from "react";

import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterInterface,
  DialogueInterface,
  ResponseInterface,
} from "../../../../game-types";
import { useGameObjects } from "../../../../../hooks";
import { TranslationComponent } from "../../../../../components";

const ModalInterrogatoireCharacterComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    character:
      | (CharacterInterface & { interrogatoireId: string | number })
      | null;
  }
> = (props) => {
  const { open, character, ...rest } = props;

  const { getData, getValueFromConstant } = useGameProvider();
  const { getGameObjectFromId } = useGameObjects();

  const dialogs = useMemo<DialogueInterface[]>(
    () =>
      (
        getData(`dialogue_${character?.interrogatoireId}_dialogues_history`) ||
        []
      ).map((d: number) => getGameObjectFromId(d)),
    [character]
  );

  const responses = useMemo<ResponseInterface[]>(
    () =>
      (
        getData(`dialogue_${character?.interrogatoireId}_responses_history`) ||
        []
      ).map((r: number) => getGameObjectFromId(r)),
    [character]
  );

  const interrogatoireDeroulement = useMemo(() => {
    const data: {
      characterName: string;
      texts: string[];
      direction: "left" | "right";
    }[] = [];
    if (!character) {
      return [];
    }
    for (let i = 0; i < dialogs.length; i++) {
      data.push({
        characterName: character?._title,
        texts: dialogs[i].texts.map((text) => text.content),
        direction: "left",
      });

      if (typeof responses[i] !== "undefined") {
        data.push({
          characterName: getValueFromConstant("player_name"),
          texts: [responses[i].text],
          direction: "right",
        });
      }
    }
    return data;
  }, [dialogs, responses, character]);

  console.log(dialogs);
  console.log(responses);
  console.log(interrogatoireDeroulement);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={character?._title}
      idDescription="message_1770976912532"
      isChildren
      {...rest}
    >
      <div>
        {interrogatoireDeroulement.map((inte, i) => (
          <div key={`ModalInterrogatoireCharacterComponent-inte-${i}`}>
            <p>{inte.characterName}:</p>
            {inte.texts.map((text, j) => (
              <p key={`ModalInterrogatoireCharacterComponent-inte-text-${j}`}>
                <TranslationComponent id={text} />
              </p>
            ))}
          </div>
        ))}

        <div>
          <button>Recommencer</button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ModalInterrogatoireCharacterComponent;
