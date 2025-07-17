import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { SizeTextTypes } from "../../../../../types";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
`;

const ModalParametersAccessibilitySizeTextComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { sizeText },
    setSizeText,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "parameters_size_text_small",
        key: "small",
        activate: sizeText === "small",
        animate: true,
      },
      {
        idText: "parameters_size_text_normal",
        key: "normal",
        activate: !sizeText || sizeText === "normal",
        animate: true,
      },
      {
        idText: "parameters_size_text_tall",
        key: "tall",
        activate: sizeText === "tall",
        animate: true,
      },
    ],
    [sizeText]
  );

  return (
    <ModalComponent
      title="parameters_size_text_title"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          delayBetweenButtons={0}
          onClick={(key: string) => {
            setSizeText(key as SizeTextTypes);
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersAccessibilitySizeTextComponent;
