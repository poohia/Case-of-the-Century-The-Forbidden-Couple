import styled from "styled-components";
import React, { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
`;

export const ParametersVibrationComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
  const {
    parameters: { activatedVibration },
    setActivatedVibration,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "no",
        idText: "label_no",
        activate: !activatedVibration,
      },
      {
        key: "yes",
        idText: "label_yes",
        activate: activatedVibration,
      },
    ],
    [activatedVibration]
  );

  return (
    <ModalParametersComponentContainer>
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          setActivatedVibration(key === "yes");
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersVibrationComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_activate_vibration"
      open={open}
      size="small"
      {...rest}
    >
      <ParametersVibrationComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersVibrationComponent;
