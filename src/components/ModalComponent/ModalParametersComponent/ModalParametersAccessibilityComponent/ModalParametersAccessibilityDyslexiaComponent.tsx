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

const ModalParametersAccessibilityDyslexiaComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    parameters: { activatedDyslexia },
    setActivatedDyslexia,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "label_no",
        key: "no",
        activate: !activatedDyslexia,
        animate: true,
      },
      {
        idText: "label_yes",
        key: "yes",
        activate: !!activatedDyslexia,
        animate: true,
      },
    ],
    [activatedDyslexia]
  );

  return (
    <ModalComponent
      title="parameters_activate_dyslexia"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ModalParametersComponentContainer>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={(key: string) => {
            setActivatedDyslexia(key === "yes");
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityDyslexiaComponent;
