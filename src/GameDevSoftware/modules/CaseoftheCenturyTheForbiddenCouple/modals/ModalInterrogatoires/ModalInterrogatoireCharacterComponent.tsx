import { useContext, useEffect, useMemo, useState } from "react";

import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import {
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../../../components";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterInterface,
  DialogueInterface,
  ResponseInterface,
} from "../../../../game-types";
import { useGameObjects } from "../../../../../hooks";
import UnlockContext from "../../contexts/UnlockContext";

const ModalInterrogatoireCharacterComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    character:
      | (CharacterInterface & {
          interrogatoireId: string | number;
          idInterrogatoireObject: number | string;
        })
      | null;
  }
> = (props) => {
  const { open, character, ...rest } = props;
  const [inert, setInert] = useState<boolean>(false);

  const {
    getData,
    getValueFromConstant,
    confirm,
    loadSaveByTitle,
    setOpenParameters,
  } = useGameProvider();
  const { getGameObjectFromId } = useGameObjects();

  const { removeInterrogatoireNotify } = useContext(UnlockContext);

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

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    return [
      {
        key: "restart",
        idText: "interrogatoire_resume_restart",
      },
    ];
  }, []);

  useEffect(() => {
    if (character && open) {
      removeInterrogatoireNotify(character.idInterrogatoireObject);
    }
  }, [open, character]);

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

        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show
          direction="row"
          disabled={inert}
          onClick={(key) => {
            if (key === "restart") {
              setInert(true);
              confirm({
                title: "message_1775830224039",
                message: "message_1775830306082",
              })
                .then((confirmation) => {
                  if (confirmation && character) {
                    setOpenParameters(false);
                    loadSaveByTitle(
                      `interrogatoire_${character.interrogatoireId}`
                    );
                  }
                })
                .finally(() => {
                  setInert(false);
                });
            }
          }}
        />
      </div>
    </ModalComponent>
  );
};

export default ModalInterrogatoireCharacterComponent;
