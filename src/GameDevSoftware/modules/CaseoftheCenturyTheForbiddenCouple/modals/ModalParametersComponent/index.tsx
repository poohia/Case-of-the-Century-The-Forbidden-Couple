import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";

import ModalComponent, {
  ModalComponentProps,
} from "../../components/ModalComponent";
import { ButtonClassicType } from "../../types";
import ButtonClassicGroupComponent from "../../components/ButtonClassicGroupComponent";
import { useGameProvider } from "../../../../../gameProvider";
import ModalParametersLanguagesComponent from "../ModalParametersLanguagesComponent";
import ModalParametersAudioComponent from "../ModalParametersAudioComponent";
import ModalParametersVibrationComponent from "../ModalParametersVibrationComponent";
import ModalParametersSoundEffectComponent from "../ModalParametersSoundEffectComponent";
import ModalParametersTextScrollingComponent from "../ModalParametersTextScrollingComponent";
import ModalParametersAccessibilityComponent from "../ModalParametersAccessibilityComponent";

export const ModalParametersComponentContainer = styled.div`
  padding: 10px;
`;

export type ModalParametersComponentProps = Omit<
  ModalComponentProps,
  "children" | "title" | "size"
>;

const ModalParametersComponent: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const { isMobileDevice } = useGameProvider();

  const [openSettingLanguages, setOpenSettingLanguages] =
    useState<boolean>(false);
  const [openSettingAudio, setOpenSettingAudio] = useState<boolean>(false);
  const [openSettingSoundEffect, setOpenSettingSoundEffect] =
    useState<boolean>(false);
  const [openSettingVibration, setOpenSettingVibration] =
    useState<boolean>(false);
  const [openTextScrolling, setOpenTextScrolling] = useState<boolean>(false);
  const [openAccessibility, setOpenAccessibility] = useState<boolean>(false);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "textScrolling",
        idText: "message_1749545275975",
        animate: true,
      },
      {
        key: "audio",
        idText: "parameters_audio",
        animate: true,
      },
      {
        key: "soundEffect",
        idText: "parameters_activate_sound_effect",
        animate: true,
      },
      {
        key: "vibration",
        idText: "parameters_vibration",
        animate: true,
      },
      {
        key: "accessibility",
        idText: "label_accessibility",
        animate: true,
      },
      {
        key: "languages",
        idText: "parameters_languages",
        animate: true,
      },
    ];
    if (isMobileDevice) {
      return menu;
    }
    return menu.filter((m) => m.key !== "vibration");
  }, [isMobileDevice]);

  const handleClickButtonsAction = useCallback((key: string) => {
    switch (key) {
      case "languages":
        setOpenSettingLanguages(true);
        break;
      case "audio":
        setOpenSettingAudio(true);
        break;
      case "soundEffect":
        setOpenSettingSoundEffect(true);
        break;
      case "vibration":
        setOpenSettingVibration(true);
        break;
      case "accessibility":
        setOpenAccessibility(true);
        break;
      case "textScrolling":
        setOpenTextScrolling(true);
        break;
    }
  }, []);

  return (
    <>
      <ModalComponent
        title="parameters_title"
        open={open}
        size="small"
        inert={
          openSettingLanguages ||
          openSettingAudio ||
          openSettingSoundEffect ||
          openSettingVibration ||
          openTextScrolling ||
          openAccessibility
        }
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
      <ModalParametersLanguagesComponent
        open={openSettingLanguages}
        isChildren
        onClose={() => {
          setOpenSettingLanguages(false);
        }}
      />
      <ModalParametersAudioComponent
        open={openSettingAudio}
        isChildren
        onClose={() => {
          setOpenSettingAudio(false);
        }}
      />
      <ModalParametersSoundEffectComponent
        open={openSettingSoundEffect}
        isChildren
        onClose={() => {
          setOpenSettingSoundEffect(false);
        }}
      />
      <ModalParametersVibrationComponent
        open={openSettingVibration}
        isChildren
        onClose={() => {
          setOpenSettingVibration(false);
        }}
      />
      <ModalParametersTextScrollingComponent
        open={openTextScrolling}
        onClose={() => {
          setOpenTextScrolling(false);
        }}
      />
      <ModalParametersAccessibilityComponent
        open={openAccessibility}
        onClose={() => {
          setOpenAccessibility(false);
        }}
      />
    </>
  );
};

export default ModalParametersComponent;
