import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import TranslationComponent from "../../../TranslationComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";
import { ModalParametersComponentContainer } from "..";

export const ParametersAccessibilityScreenReaderEnabledComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
  const {
    parameters: { screenReaderEnabled },
    setScreenReaderEnabled,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "parameters_screen_reader_enabled_desable",
        key: "no",
        activate: !screenReaderEnabled,
        animate: true,
      },
      {
        idText: "parameters_screen_reader_enabled_enable",
        key: "yes",
        activate: !!screenReaderEnabled,
        animate: true,
      },
    ],
    [screenReaderEnabled]
  );

  return (
    <ModalParametersComponentContainer>
      <TranslationComponent id="parameters_screen_reader_enabled_description" />
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          setScreenReaderEnabled(key === "yes");
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersAccessibilityScreenReaderEnabledComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_screen_reader_enabled"
      idDescription="parameters_screen_reader_enabled_description"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersAccessibilityScreenReaderEnabledComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityScreenReaderEnabledComponent;
