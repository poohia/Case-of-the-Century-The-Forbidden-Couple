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

const ModalParametersComponentContainer = styled.div``;

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
      case "vibration":
        setOpenSettingVibration(true);
        break;
    }
  }, []);

  return (
    <>
      <ModalComponent title="parameters_title" open={open} {...rest}>
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
        onClose={() => {
          setOpenSettingLanguages(false);
        }}
      />
      <ModalParametersAudioComponent
        open={openSettingAudio}
        onClose={() => {
          setOpenSettingAudio(false);
        }}
      />
      <ModalParametersVibrationComponent
        open={openSettingVibration}
        onClose={() => {
          setOpenSettingVibration(false);
        }}
      />
    </>
  );
};

export default ModalParametersComponent;
