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
    getThumbBottom,
    handleThumbMouseDown,
    handleTrackClick,
    handleTrackTouchStart,
    handleThumbTouchStart,
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
            style={{ bottom: getThumbBottom() }}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
          >
            <span>{value}%</span>
          </Thumb>
        </SliderContainer>
      </ModalParametersComponentContainerAudio>
    </ModalComponent>
  );
};

export default ModalParametersSoundEffectComponent;
