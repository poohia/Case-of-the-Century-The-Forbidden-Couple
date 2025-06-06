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

const ModalParametersAudioComponent: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const {
    parameters: { activatedMusic },
    setActivatedMusic,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "yes",
        idText: "label_yes",
        activate: activatedMusic > 0,
      },
      {
        key: "no",
        idText: "label_no",
        activate: !activatedMusic,
      },
    ],
    [activatedMusic]
  );

  return (
    <ModalComponent title="parameters_audio" open={open} size="small" {...rest}>
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          delayBetweenButtons={0}
          onClick={(key: string) => {
            setActivatedMusic(key === "yes" ? 1 : 0);
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersAudioComponent;
