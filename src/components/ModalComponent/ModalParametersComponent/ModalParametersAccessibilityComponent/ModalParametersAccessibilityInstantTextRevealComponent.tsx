import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import TranslationComponent from "../../../TranslationComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
  text-align: center;
  > span {
    font-style: italic;
  }
  > div {
    margin-top: 10px;
  }
`;

const ModalParametersAccessibilityInstantTextRevealComponent: React.FC<
  ModalChildrenParametersComponentProps
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
