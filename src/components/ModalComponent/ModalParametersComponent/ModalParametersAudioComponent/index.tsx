import styled from "styled-components";

import useModalParametersAudioComponent from "./useModalParametersAudioComponent";
import ModalComponent, { ModalChildrenParametersComponentProps } from "../..";

export const ModalParametersComponentContainerAudio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 40px;
  height: 84%;
  max-height: 700px;
  display: flex;
  justify-content: center;
  user-select: none;
  touch-action: none;
`;

export const Track = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ theme }) => theme.default_modal.color};
  border-radius: 2px;
  cursor: pointer;
`;

export const Thumb = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: calc(40px - 6px);
  height: calc(30px - 6px);
  padding: 0 4px;
  background-color: #444;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  transition: background-color 0.1s;
  color: ${({ theme }) => theme.default_modal.color};
  background-color: ${({ theme }) =>
    theme.default_modal.thumb_background_color};
  border: 3px solid ${({ theme }) => theme.default_modal.thumb_border_color};
  display: flex;
  justify-content: center;
  align-items: center;
  /* Important: focus visible */
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.default_modal.thumb_border_color};
    outline-offset: 4px;
  }
  span {
    font-size: 11px;
    font-weight: bold;
  }
`;

const ModalParametersAudioComponent: React.FC<
  ModalChildrenParametersComponentProps
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
  } = useModalParametersAudioComponent("music");

  return (
    <ModalComponent
      title="parameters_audio"
      open={open}
      isChildren
      size="small"
      {...rest}
    >
      <ModalParametersComponentContainerAudio className="with-padding">
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
    </ModalComponent>
  );
};

export default ModalParametersAudioComponent;
