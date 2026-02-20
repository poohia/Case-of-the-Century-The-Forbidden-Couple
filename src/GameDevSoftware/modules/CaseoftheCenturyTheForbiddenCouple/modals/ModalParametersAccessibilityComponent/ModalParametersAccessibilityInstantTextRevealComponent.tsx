import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { TranslationComponent } from "../../../../../components";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
  text-align: center;
  > span {
    font-style: italic;
  }
  > div {
    margin-top: 10px;
  }
`;

const ModalParametersAccessibilityInstantTextRevealComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { instantTextReveal },
    setInstantTextReveal,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "parameters_instant_text_reveal_normal",
        key: "no",
        activate: !instantTextReveal,
        animate: true,
      },
      {
        idText: "parameters_instant_text_reveal_instant",
        key: "yes",
        activate: !!instantTextReveal,
        animate: true,
      },
    ],
    [instantTextReveal]
  );

  return (
    <ModalComponent
      title="parameters_instant_text_reveal"
      idDescription="parameters_instant_text_reveal_description"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <TranslationComponent id="parameters_instant_text_reveal_description" />
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            setInstantTextReveal(key === "yes");
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityInstantTextRevealComponent;
