import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
`;

const ModalParametersVibrationComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
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
    <ModalComponent
      title="parameters_activate_vibration"
      open={open}
      size="small"
      {...rest}
    >
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            setActivatedVibration(key === "yes");
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersVibrationComponent;
