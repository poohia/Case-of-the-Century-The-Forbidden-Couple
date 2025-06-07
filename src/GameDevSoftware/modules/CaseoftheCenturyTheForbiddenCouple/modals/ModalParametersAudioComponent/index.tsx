import styled from "styled-components";

import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import useModalParametersAudioComponent from "./useModalParametersAudioComponent";

export const ModalParametersComponentContainerAudio = styled.div`
  padding: 10px;
  height: 100%;
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
`;

export const Track = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #ccc;
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
  background-color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 11px;
    font-weight: bold;
  }
`;

const ModalParametersAudioComponent: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const {
    value,
    trackRef,
    getThumbBottom,
    handleThumbMouseDown,
    handleTrackClick,
    handleTrackTouchStart,
    handleThumbTouchStart,
  } = useModalParametersAudioComponent("music");

  return (
    <ModalComponent title="parameters_audio" open={open} size="small" {...rest}>
      <ModalParametersComponentContainerAudio>
        <SliderContainer>
          <Track
            ref={trackRef}
            onClick={handleTrackClick}
            onTouchStart={handleTrackTouchStart}
          />
          {/* 
            Le Thumb réagit à onMouseDown et onTouchStart
          */}
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

export default ModalParametersAudioComponent;
