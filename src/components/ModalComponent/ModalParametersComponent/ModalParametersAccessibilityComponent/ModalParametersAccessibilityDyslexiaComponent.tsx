import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";
import { ModalParametersComponentContainer } from "..";

export const ParametersAccessibilityDyslexiaComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
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
    <ModalParametersComponentContainer>
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          setActivatedDyslexia(key === "yes");
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersAccessibilityDyslexiaComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_activate_dyslexia"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersAccessibilityDyslexiaComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityDyslexiaComponent;
