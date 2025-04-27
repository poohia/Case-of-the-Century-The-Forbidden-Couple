import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
`;

const ModalParametersVibrationComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { activatedVibration },
    setActivatedVibration,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "yes",
        idText: "label_yes",
        activate: activatedVibration,
      },
      {
        key: "no",
        idText: "label_no",
        activate: !activatedVibration,
      },
    ],
    [activatedVibration]
  );

  return (
    <ModalComponent
      title="parameters_vibration"
      open={open}
      size="small"
      {...rest}
    >
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          delayBetweenButtons={0}
          onClick={(key: string) => {
            setActivatedVibration(key === "yes");
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersVibrationComponent;
