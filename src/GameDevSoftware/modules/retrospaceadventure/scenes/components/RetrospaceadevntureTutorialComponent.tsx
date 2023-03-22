import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TranslationComponent } from "../../../../../components";
import ModalComponent from "./styled/Modal";
import { TutorialViewType } from "../../../../../types";
import { useAssets } from "../../../../../hooks";
import styled from "styled-components";
import VideoComponent from "../../../../../components/VideoComponent";

type RetrospaceadevntureTutorialComponentProps = {
  views: TutorialViewType[];
  refParentContainer: React.RefObject<HTMLDivElement>;
  lastIcon?: string;
  children?: React.ReactElement;
  onClickLastStep: () => void;
};

const RetrospaceadevntureTutorialComponentContainer = styled.div`
  margin: 10px;
  overflow: hidden;
  &.hidden {
    visibility: hidden;
  }
`;

const RetrospaceadevntureTutorialComponentTutoContent = styled.div`
  position: absolute;
  margin: 0;
  display: none;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  padding: 2px 2px;
  img,
  video {
    max-width: 400px;
  }
  h2 {
    margin: 10px;
  }
`;
const RetrospaceadevntureTutorialComponentFooterContent = styled(
  RetrospaceadevntureTutorialComponentTutoContent
)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  div {
    &:nth-child(1) {
      img {
        margin-right: 20px;
      }
    }
  }
  img {
    cursor: pointer;
    width: 32px;
  }
`;

const RetrospaceadventureTutorialCarouselInner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const RetrospaceadventureTutorialCarouselInnerItem = styled.div<{
  active: boolean;
}>`
    width: 5px;
    height: 5px;
    background-color: ${({ active }) =>
      active ? "rgba(0, 0, 0, 1);" : "rgba(0, 0, 0, 0.5);"}
    margin: 2px;
`;

const RetrospaceadevntureTutorialComponentChildren: React.FC<
  Pick<RetrospaceadevntureTutorialComponentProps, "views"> & { step: number }
> = ({ views, step }) => {
  const { getAssetImg, getAssetVideo } = useAssets();

  const currentView = useMemo(() => views[step], [views, step]);

  return (
    <>
      <div>
        {currentView.isVideo ? (
          <VideoComponent
            autoPlay
            loop
            src={getAssetVideo(currentView.image)}
          />
        ) : (
          <img src={getAssetImg(currentView.image)} alt="" />
        )}
      </div>
      {views.length > 1 && (
        <RetrospaceadventureTutorialCarouselInner>
          {views.map((_, i) => (
            <RetrospaceadventureTutorialCarouselInnerItem
              key={`retrospaceadventure-tutorial-carousel-inner-${i}`}
              active={i === step}
            ></RetrospaceadventureTutorialCarouselInnerItem>
          ))}
        </RetrospaceadventureTutorialCarouselInner>
      )}
      <div>
        <h2>
          <TranslationComponent id={currentView.title} />
        </h2>
      </div>
      <div>
        <TranslationComponent id={currentView.text} />
      </div>
    </>
  );
};

const RetrospaceadevntureTutorialComponent: React.FC<
  RetrospaceadevntureTutorialComponentProps
> = ({
  views,
  refParentContainer,
  lastIcon = "right-arrow.png",
  children,
  onClickLastStep,
}) => {
  const [step, setStep] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [showWithAnimation, setShowWithAnimation] = useState<boolean>(false);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);
  const { getAssetImg } = useAssets();

  useEffect(() => {
    if (refModalContainer?.current) {
      refModalContainer.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [step]);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    setTimeout(() => setShowWithAnimation(true), 1000);
  }, []);

  const updateSize = useCallback(() => {
    if (refParentContainer.current) {
      setWidth(refParentContainer.current.clientWidth - 20);
      setHeight(refParentContainer.current.clientHeight - 20);
    }
  }, [refParentContainer]);

  useEffect(() => {
    if (refParentContainer.current) {
      updateSize();
    }
  }, [refParentContainer, updateSize]);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  return (
    <RetrospaceadevntureTutorialComponentContainer
    // className={
    //   showWithAnimation ? "animate__animated animate__bounceIn" : "hidden"
    // }
    >
      <ModalComponent
        width={width}
        height={height}
        refParentContainer={refParentContainer}
        refChildren={refModalContainer}
        refFooterContainer={refModalFooterContainer}
        show={show}
      ></ModalComponent>
      <RetrospaceadevntureTutorialComponentTutoContent ref={refModalContainer}>
        {children ? (
          children
        ) : (
          <RetrospaceadevntureTutorialComponentChildren
            step={step}
            views={views}
          />
        )}
      </RetrospaceadevntureTutorialComponentTutoContent>
      <RetrospaceadevntureTutorialComponentFooterContent
        ref={refModalFooterContainer}
      >
        <div
          onClick={() => {
            step !== 0 && setStep(step - 1);
          }}
        >
          {step !== 0 && <img src={getAssetImg("left-arrow.png")} alt="" />}
        </div>
        {views.length !== 0 && step !== views.length - 1 && (
          <div
            onClick={() => {
              setStep(step + 1);
            }}
          >
            <img src={getAssetImg("right-arrow.png")} alt="" />
          </div>
        )}
        {(step === views.length - 1 || views.length === 0) && (
          <div onClick={onClickLastStep}>
            <img src={getAssetImg(lastIcon)} alt="" />
          </div>
        )}
      </RetrospaceadevntureTutorialComponentFooterContent>
    </RetrospaceadevntureTutorialComponentContainer>
  );
};

export default RetrospaceadevntureTutorialComponent;
