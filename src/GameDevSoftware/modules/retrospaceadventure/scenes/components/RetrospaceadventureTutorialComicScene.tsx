import styled from "styled-components";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { useState } from "react";
import { useOnLongPress } from "../../../../../hooksGestures";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: Audiowide;
  div {
    border: 1px dashed white;
    margin: 1px;
    width: 99%;
    height: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:first-child {
      flex-basis: 20vw;
      span {
        margin: 10px;
      }
    }
    &:last-child {
      flex-basis: 80vw;
    }
  }
  .long-press {
    flex-direction: column;
  }
`;

const RetrospaceadventureTutorialComicScene: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const [step, setStep] = useState<number>(1);
  const { handleClick, startPressTimer, stopPressTimer } = useOnLongPress({
    onLongPress: () => {
      if (step === 2) {
        onClick();
      }
    },
    vibrateSuccess: true,
  });
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        handleClick(e);
        if (step === 1) setStep(step + 1);
      }}
      onMouseDown={startPressTimer} // Desktop long click
      onMouseUp={stopPressTimer}
      onMouseLeave={stopPressTimer}
      onTouchStart={startPressTimer} // Mobile long touch
      onTouchEnd={stopPressTimer}
    >
      {step === 1 && (
        <>
          <div>
            <TranslationComponent id="retrospaceadventure_prev_info" />
          </div>
          <div>
            <TranslationComponent id="retrospaceadventure_next_info" />
          </div>
        </>
      )}
      {step === 2 && (
        <div className="long-press">
          <ImgComponent src="long click.png" />
          <TranslationComponent id="retrospaceadventure_long_press_menu_info" />
        </div>
      )}
    </Container>
  );
};

export default RetrospaceadventureTutorialComicScene;
