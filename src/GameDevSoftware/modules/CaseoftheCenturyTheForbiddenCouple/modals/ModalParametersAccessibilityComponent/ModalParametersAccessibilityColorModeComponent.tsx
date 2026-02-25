import styled from "styled-components";
import { useMemo } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import { useGameProvider } from "../../../../../gameProvider";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { ColorModeTypes } from "../../../../../types";
import { ButtonClassicGroupComponent } from "../../../../../components";

const ModalParametersComponentContainer = styled.div`
  padding: 10px;
  height: calc(100% - 20px) !important;
`;

const ModalParametersAccessibilityColorModeComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
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
    <ModalComponent
      title="parameters_color_mode_title"
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
            setColorMode(key as ColorModeTypes);
          }}
        />
      </ModalParametersComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersAccessibilityColorModeComponent;
