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

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    if (isMobileDevice) {
      return [
        {
          key: "languages",
          idText: "parameters_languages",
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
      ];
    }
    return [
      {
        key: "languages",
        idText: "parameters_languages",
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
    ];
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
    }
  }, []);

  return (
    <>
      <ModalComponent
        title="parameters_title"
        open={open}
        size="small"
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
    </>
  );
};

export default ModalParametersComponent;
