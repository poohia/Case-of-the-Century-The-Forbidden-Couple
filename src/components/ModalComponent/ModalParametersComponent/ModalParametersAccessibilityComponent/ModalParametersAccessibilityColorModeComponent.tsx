import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";
import { ColorModeTypes } from "../../../../types";
import { ModalParametersComponentContainer } from "..";

export const ParametersAccessibilityColorModeComponent: React.FC<{
  open: boolean;
  buttonsDirection?: ButtonClassicGroupComponentProps["direction"];
  delayBetweenButtons?: ButtonClassicGroupComponentProps["delayBetweenButtons"];
}> = ({ open, buttonsDirection, delayBetweenButtons }) => {
  const {
    parameters: { colorMode },
    setColorMode,
  } = useGameProvider();

  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        idText: "color_mode_normal",
        key: "normal",
        activate: !colorMode || colorMode === "normal",
        animate: true,
      },
      {
        idText: "color_mode_high_contrast",
        key: "high-contrast",
        activate: colorMode === "high-contrast",
        animate: true,
      },
      {
        idText: "color_mode_darkandwhite",
        key: "darkandwhite",
        activate: colorMode === "darkandwhite",
        animate: true,
      },
    ],
    [colorMode]
  );

  return (
    <ModalParametersComponentContainer>
      <ButtonClassicGroupComponent
        buttons={buttonsAction}
        show={open}
        direction={buttonsDirection}
        delayBetweenButtons={delayBetweenButtons}
        onClick={(key: string) => {
          setColorMode(key as ColorModeTypes);
        }}
      />
    </ModalParametersComponentContainer>
  );
};

const ModalParametersAccessibilityColorModeComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_color_mode_title"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersAccessibilityColorModeComponent open={open} />
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityColorModeComponent;
