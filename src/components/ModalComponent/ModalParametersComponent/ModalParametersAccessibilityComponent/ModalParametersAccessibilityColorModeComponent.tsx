import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent, {
  ButtonClassicGroupComponentProps,
} from "../../../ButtonClassicGroupComponent";
import { ColorModeTypes } from "../../../../types";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
`;

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
        idText: "color_mode_achromatopsia",
        key: "achromatopsia",
        activate: colorMode === "achromatopsia",
        animate: true,
      },
      {
        idText: "color_mode_protanopia",
        key: "protanopia",
        activate: colorMode === "protanopia",
        animate: true,
      },
      {
        idText: "color_mode_deuteranopia",
        key: "deuteranopia",
        activate: colorMode === "deuteranopia",
        animate: true,
      },
      {
        idText: "color_mode_tritanopia",
        key: "tritanopia",
        activate: colorMode === "tritanopia",
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
