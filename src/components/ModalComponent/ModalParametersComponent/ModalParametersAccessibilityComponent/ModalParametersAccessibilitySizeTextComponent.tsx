import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";
import { SizeTextTypes } from "../../../../types";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
`;

export const ParametersAccessibilitySizeTextComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
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
    <ModalParametersComponentContainer>
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          setSizeText(key as SizeTextTypes);
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersAccessibilitySizeTextComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_size_text_title"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersAccessibilitySizeTextComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersAccessibilitySizeTextComponent;
