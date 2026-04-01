import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";
import {
  ModalParametersComponentContainerAudio,
  SliderContainer,
  Thumb,
  Track,
} from "../ModalParametersAudioComponent";
import useModalParametersAudioComponent from "../ModalParametersAudioComponent/useModalParametersAudioComponent";

export const ParametersSoundEffectComponent: React.FC = () => {
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
          aria-label={translateText("parameters_audio_aria_label")}
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
  );
};

const ModalParametersSoundEffectComponent: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  return (
    <ModalComponent
      title="parameters_activate_sound_effect"
      open={open}
      size="small"
      isChildren
      {...rest}
    >
      <ParametersSoundEffectComponent />
    </ModalComponent>
  );
};

export default ModalParametersSoundEffectComponent;
