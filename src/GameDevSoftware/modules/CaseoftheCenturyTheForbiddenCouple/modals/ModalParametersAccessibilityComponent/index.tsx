import { useCallback, useMemo, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import {
  ModalParametersComponentContainer,
  ModalParametersComponentProps,
} from "../ModalParametersComponent";
import ModalParametersAccessibilityDyslexiaComponent from "./ModalParametersAccessibilityDyslexiaComponent";
import ModalParametersAccessibilitySizeTextComponent from "./ModalParametersAccessibilitySizeTextComponent";
import ModalParametersAccessibilityColorModeComponent from "./ModalParametersAccessibilityColorModeComponent";

const ModalParametersAccessibilityComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [openActivateDyslexia, setOpenActivateDyslexia] =
    useState<boolean>(false);

  const [openSizeText, setOpenSizeText] = useState<boolean>(false);
  const [openColorMode, setOpenColorMode] = useState<boolean>(false);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "colorMode",
        idText: "parameters_color_mode_title",
        animate: true,
      },
      {
        key: "sizeText",
        idText: "parameters_size_text_title",
        animate: true,
      },
      {
        key: "activateDyslexia",
        idText: "parameters_activate_dyslexia",
        animate: true,
      },
    ];

    return menu.filter((m) => m.key !== "vibration");
  }, []);

  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "colorMode":
        setOpenColorMode(true);
        break;
      case "activateDyslexia":
        setOpenActivateDyslexia(true);
        break;
      case "sizeText":
        setOpenSizeText(true);
        break;
    }
  }, []);

  return (
    <>
      <ModalComponent
        title="label_accessibility"
        open={open}
        size="small"
        isChildren
        {...rest}
      >
        <ModalParametersComponentContainer>
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show={open}
            onClick={handleClickButtonsAction}
          />
        </ModalParametersComponentContainer>
      </ModalComponent>
      <ModalParametersAccessibilityDyslexiaComponent
        open={openActivateDyslexia}
        onClose={() => {
          setOpenActivateDyslexia(false);
        }}
      />
      <ModalParametersAccessibilitySizeTextComponent
        open={openSizeText}
        onClose={() => {
          setOpenSizeText(false);
        }}
      />
      <ModalParametersAccessibilityColorModeComponent
        open={openColorMode}
        onClose={() => {
          setOpenColorMode(false);
        }}
      />
    </>
  );
};

export default ModalParametersAccessibilityComponent;
