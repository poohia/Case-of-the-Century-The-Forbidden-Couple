import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import { DialoguePlayback } from "../../../../types";
import TranslationComponent from "../../../TranslationComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  text-align: center;
  height: calc(100% - 20px) !important;
  > span {
    font-style: italic;
  }
  > div {
    margin-top: 10px;
  }
`;

const ModalParametersDialogueSpeedComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { dialogueSpeed },
    setDialogueSpeed,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: DialoguePlayback.Manual.toString(),
        idText: "parameters_dialogue_speed_manual",
        activate:
          dialogueSpeed === DialoguePlayback.Manual ||
          dialogueSpeed === undefined,
        animate: true,
      },
      {
        key: DialoguePlayback.Slow.toString(),
        idText: "parameters_dialogue_speed_slow",
        activate: dialogueSpeed === DialoguePlayback.Slow,
        animate: true,
      },
      {
        key: DialoguePlayback.Normal.toString(),
        idText: "parameters_dialogue_speed_normal",
        activate: dialogueSpeed === DialoguePlayback.Normal,
        animate: true,
      },
      {
        key: DialoguePlayback.Fast.toString(),
        idText: "parameters_dialogue_speed_fast",
        activate: dialogueSpeed === DialoguePlayback.Fast,
        animate: true,
      },
    ],
    [dialogueSpeed]
  );

  return (
    <ModalComponent
      title="parameters_dialogue_speed"
      idDescription="parameters_dialogue_speed_description"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <TranslationComponent id="parameters_dialogue_speed_description" />
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            setDialogueSpeed(Number(key));
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersDialogueSpeedComponent;
