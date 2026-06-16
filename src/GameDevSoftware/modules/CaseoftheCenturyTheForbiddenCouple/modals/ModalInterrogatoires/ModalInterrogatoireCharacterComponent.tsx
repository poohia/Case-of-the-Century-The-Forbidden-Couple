import { useContext, useEffect, useId, useMemo, useState } from "react";

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
import {
  ModalInterrogatoireCharacterActions,
  ModalInterrogatoireCharacterBubble,
  ModalInterrogatoireCharacterContainer,
  ModalInterrogatoireCharacterEntry,
  ModalInterrogatoireCharacterList,
  ModalInterrogatoireCharacterSpeaker,
  ModalInterrogatoireCharacterTranscript,
} from "./styled";

const ModalInterrogatoireCharacterComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    character:
      | (CharacterInterface & {
          interrogatoireId: string | number;
          idInterrogatoireObject: number | string;
          srDescription: string;
        })
      | null;
  }
> = (props) => {
  const { open, character, ...rest } = props;
  const [inert, setInert] = useState<boolean>(false);
  const modalDescriptionId = useId();

  const {
    getData,
    getValueFromConstant,
    confirm,
    loadSaveByTitle,
    setOpenParameters,
    translateText,
  } = useGameProvider();
  const { getGameObject } = useGameObjects();

  const { removeInterrogatoireNotify } = useContext(UnlockContext);

  const playerName = useMemo(
    () => getValueFromConstant("player_name"),
    [getValueFromConstant]
  );

  const characterDisplayName = useMemo(() => {
    if (!character) {
      return "";
    }

    return translateText(character._title);
  }, [character, translateText]);

  const dialogs = useMemo<DialogueInterface[]>(() => {
    if (!open || !character) {
      return [];
    }

    return (
      getData<number[]>(
        `dialogue_${character.interrogatoireId}_dialogues_history`
      ) || []
    )
      .map((dialogueId) => getGameObject<DialogueInterface>(dialogueId))
      .filter(Boolean) as DialogueInterface[];
  }, [character, getData, getGameObject, open]);

  const responses = useMemo<ResponseInterface[]>(() => {
    if (!open || !character) {
      return [];
    }

    return (
      getData<number[]>(
        `dialogue_${character.interrogatoireId}_responses_history`
      ) || []
    )
      .map((responseId) => getGameObject<ResponseInterface>(responseId))
      .filter(Boolean) as ResponseInterface[];
  }, [character, getData, getGameObject, open]);

  const interrogatoireDeroulement = useMemo(() => {
    const data: {
      key: string;
      speakerName: string;
      speakerNameId?: string;
      texts: string[];
      direction: "left" | "right";
    }[] = [];

    if (!character) {
      return [];
    }

    for (let i = 0; i < dialogs.length; i++) {
      data.push({
        key: `dialog-${dialogs[i]._id}-${i}`,
        speakerName: characterDisplayName,
        speakerNameId: character._title,
        texts: dialogs[i].texts.map((text) => text.content),
        direction: "left",
      });

      if (typeof responses[i] !== "undefined") {
        data.push({
          key: `response-${responses[i]._id}-${i}`,
          speakerName: playerName,
          texts: [responses[i].text],
          direction: "right",
        });
      }
    }

    return data;
  }, [character, characterDisplayName, dialogs, playerName, responses]);

  const screenReaderDescription = useMemo(() => {
    if (!character) {
      return "";
    }

    return translateText(character.srDescription);
  }, [character, translateText]);

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
  }, [character, open, removeInterrogatoireNotify]);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={character?._title}
      idDescription={modalDescriptionId}
      isChildren
      {...rest}
    >
      <ModalInterrogatoireCharacterContainer>
        <span id={modalDescriptionId} className="sr-only">
          {screenReaderDescription}
        </span>
        <ModalInterrogatoireCharacterTranscript
          aria-label={screenReaderDescription}
        >
          <ModalInterrogatoireCharacterList>
            {interrogatoireDeroulement.map((entry) => (
              <ModalInterrogatoireCharacterEntry
                key={entry.key}
                $direction={entry.direction}
                aria-label={`Intervention de ${entry.speakerName}`}
              >
                <ModalInterrogatoireCharacterSpeaker
                  $direction={entry.direction}
                >
                  {entry.speakerNameId ? (
                    <TranslationComponent id={entry.speakerNameId} />
                  ) : (
                    <TranslationComponent id={entry.speakerName} />
                  )}
                </ModalInterrogatoireCharacterSpeaker>
                <ModalInterrogatoireCharacterBubble
                  $direction={entry.direction}
                >
                  {entry.texts.map((text, i) => (
                    <p key={`${entry.key}-text-${i}`}>
                      <TranslationComponent id={text} />
                    </p>
                  ))}
                </ModalInterrogatoireCharacterBubble>
              </ModalInterrogatoireCharacterEntry>
            ))}
          </ModalInterrogatoireCharacterList>
        </ModalInterrogatoireCharacterTranscript>
        <ModalInterrogatoireCharacterActions>
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show
            size="small"
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
        </ModalInterrogatoireCharacterActions>
      </ModalInterrogatoireCharacterContainer>
    </ModalComponent>
  );
};

export default ModalInterrogatoireCharacterComponent;
