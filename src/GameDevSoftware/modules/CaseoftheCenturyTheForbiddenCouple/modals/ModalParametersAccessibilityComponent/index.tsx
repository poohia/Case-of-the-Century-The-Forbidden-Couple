import { useCallback, useMemo, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import {
  ModalParametersComponentContainer,
  ModalParametersComponentProps,
} from "../ModalParametersComponent";
import ModalParametersAccessibilityDyslexiaComponent from "./ModalParametersAccessibilityDyslexiaComponent";

const ModalParametersAccessibilityComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [openActivateDyslexia, setOpenActivateDyslexia] =
    useState<boolean>(false);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
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
      case "activateDyslexia":
        setOpenActivateDyslexia(true);
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
    </>
  );
};

export default ModalParametersAccessibilityComponent;
