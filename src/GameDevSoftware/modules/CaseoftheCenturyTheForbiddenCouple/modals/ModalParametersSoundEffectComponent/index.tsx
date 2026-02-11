import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import {
  ModalParametersComponentContainerAudio,
  SliderContainer,
  Thumb,
  Track,
} from "../ModalParametersAudioComponent";
import useModalParametersAudioComponent from "../ModalParametersAudioComponent/useModalParametersAudioComponent";

const ModalParametersSoundEffectComponent: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const {
    value,
    trackRef,
    handleThumbMouseDown,
    handleTrackClick,
    handleTrackTouchStart,
    handleThumbTouchStart,
    handleThumbKeyDown,
    translateText,
  } = useModalParametersAudioComponent("soundEffect");

  return (
    <ModalComponent
      title="parameters_activate_sound_effect"
      open={open}
      size="small"
      {...rest}
    >
      <ModalParametersComponentContainerAudio>
        <SliderContainer>
          <Track
            ref={trackRef}
            onClick={handleTrackClick}
            onTouchStart={handleTrackTouchStart}
          />
          <Thumb
            style={{ bottom: `${value}%` }}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
            tabIndex={0}
            role="slider"
            aria-label={translateText("message_1770830778298")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={`${value}%`}
            onKeyDown={handleThumbKeyDown}
          >
            <span>{value}%</span>
          </Thumb>
        </SliderContainer>
      </ModalParametersComponentContainerAudio>
    </ModalComponent>
  );
};

export default ModalParametersSoundEffectComponent;
