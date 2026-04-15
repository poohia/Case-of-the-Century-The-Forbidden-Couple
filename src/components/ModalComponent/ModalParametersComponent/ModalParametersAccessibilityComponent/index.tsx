import { useCallback, useMemo, useState } from "react";

import ModalParametersAccessibilityDyslexiaComponent from "./ModalParametersAccessibilityDyslexiaComponent";
import ModalParametersAccessibilitySizeTextComponent from "./ModalParametersAccessibilitySizeTextComponent";
import ModalParametersAccessibilityColorModeComponent from "./ModalParametersAccessibilityColorModeComponent";
import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import { ButtonClassicType } from "../../../ButtonClassicComponent";
import ButtonClassicGroupComponent from "../../../ButtonClassicGroupComponent";
import ModalParametersAccessibilityScreenReaderEnabledComponent from "./ModalParametersAccessibilityScreenReaderEnabledComponent";

const ModalParametersAccessibilityComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [openScreenReaderEnabled, setOpenScreenReaderEnabled] =
    useState<boolean>(false);
  const [openActivateDyslexia, setOpenActivateDyslexia] =
    useState<boolean>(false);
  const [openSizeText, setOpenSizeText] = useState<boolean>(false);
  const [openColorMode, setOpenColorMode] = useState<boolean>(false);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "screenReaderEnabled",
        idText: "parameters_screen_reader_enabled",
        animate: true,
      },
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
      case "screenReaderEnabled":
        setOpenScreenReaderEnabled(true);
        break;
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
        title="parameters_accessibility"
        open={open}
        size="small"
        isChildren
        inert={
          openActivateDyslexia ||
          openColorMode ||
          openScreenReaderEnabled ||
          openSizeText
        }
        {...rest}
      >
        <div>
          <ButtonClassicGroupComponent
            buttons={buttonsAction}
            show={open}
            onClick={handleClickButtonsAction}
          />
        </div>
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
      <ModalParametersAccessibilityScreenReaderEnabledComponent
        open={openScreenReaderEnabled}
        onClose={() => {
          setOpenScreenReaderEnabled(false);
        }}
      />
    </>
  );
};

export default ModalParametersAccessibilityComponent;
