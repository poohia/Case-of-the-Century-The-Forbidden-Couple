import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalComponent from "./styled/Modal";
import { ImgComponent, TranslationComponent } from "../../../../../components";

const RetrospaceadevntureComputerModalComponentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  > div {
    width: 90%;
    height: 90%;
    position: relative;
    > div {
      position: absolute;
      visibility: hidden;
      &:last-child {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const RetrospaceadventureComputerSplashscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RetrospaceadventureComputerFinalViewContainer = styled.div`
  display: flex;
  width: 100%;
  padding-right: 2%;
`;

const RetrospaceadventureComputerFinalViewContainerChild = styled.div`
  flex: 1;
`;

const ComputerLogoComponent: React.FC = () => {
  return (
    <RetrospaceadventureComputerSplashscreen>
      <div className={"animate__animated animate__fadeIn animate__slower"}>
        <ImgComponent src="otter logo os.webp" width={120} height={120} />
      </div>
      <div className={"animate__animated animate__fadeIn animate__slower"}>
        <TranslationComponent id="computer_otter_os_loading_label" />
      </div>
    </RetrospaceadventureComputerSplashscreen>
  );
};

const ComputerModalComponent: React.FC<{
  open?: boolean;
  children: React.ReactNode;
  childrenFooter?: React.ReactNode;
}> = ({ open, children, childrenFooter }) => {
  const { playSoundEffect } = useGameProvider();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [stepView, setStepView] = useState<0 | 1>(0);
  const refParentContainer = useRef<HTMLDivElement>(null);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);
  const { innerHeight, innerWidth } = useGameProvider();

  const updateSize = useCallback(() => {
    if (refParentContainer.current) {
      setWidth(refParentContainer.current.clientWidth);
      setHeight(refParentContainer.current.clientHeight);
    }
  }, [refParentContainer]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        playSoundEffect("otteros.mp3");
      }, 300);
      setTimeout(() => {
        setStepView(1);
      }, 1200);
    } else {
      setStepView(0);
    }
  }, [open]);

  useEffect(() => {
    if (refParentContainer.current && open) {
      updateSize();
    }
  }, [refParentContainer, innerHeight, innerWidth, open, updateSize]);

  if (!open) return <></>;

  return (
    <RetrospaceadevntureComputerModalComponentContainer>
      <div
        ref={refParentContainer}
        className={"animate__animated animate__bounceIn animate__faster"}
      >
        <ModalComponent
          preset="game"
          width={width}
          height={height}
          refParentContainer={refParentContainer}
          refChildren={refModalContainer}
          refFooterContainer={refModalFooterContainer}
          show
          withAnimationFast
        />
        <div ref={refModalContainer}>
          {stepView === 0 && <ComputerLogoComponent />}
          {stepView === 1 && (
            <RetrospaceadventureComputerFinalViewContainer>
              <RetrospaceadventureComputerFinalViewContainerChild>
                {children}
              </RetrospaceadventureComputerFinalViewContainerChild>
              <div>
                <ImgComponent src="otter logo os.webp" width={24} height={24} />
              </div>
            </RetrospaceadventureComputerFinalViewContainer>
          )}
        </div>
        <div ref={refModalFooterContainer}>
          {stepView === 1 && childrenFooter && (
            <RetrospaceadventureComputerFinalViewContainer>
              {childrenFooter}
            </RetrospaceadventureComputerFinalViewContainer>
          )}
        </div>
      </div>
    </RetrospaceadevntureComputerModalComponentContainer>
  );
};

export default ComputerModalComponent;
