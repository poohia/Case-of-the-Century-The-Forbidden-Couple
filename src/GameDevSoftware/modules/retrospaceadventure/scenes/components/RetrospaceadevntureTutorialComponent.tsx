import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TranslationComponent } from "../../../../../components";
import ModalComponent from "./styled/Modal";
import { TutorialViewType } from "../../../../../types";
import { useAssets, useVibrate } from "../../../../../hooks";
import styled from "styled-components";
import VideoComponent from "../../../../../components/VideoComponent";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";

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
    font-size: 2.4rem;
    text-align: center;
  }
  > div {
    &:nth-child(4) {
      padding: 20px;
      font-size: 1.1rem;
      line-height: 30px;
      text-align: center;
    }
  }
  visibility: hidden;
`;
const RetrospaceadevntureTutorialComponentFooterContent = styled(
  RetrospaceadevntureTutorialComponentTutoContent
)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  overflow: hidden;
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

const RetrospaceadevntureTutorialComponentTutoActionContent = styled.div`
  width: 20%;
  min-width: 200px;
  height: 100%;
`;

const RetrospaceadevntureTutorialComponentChildren: React.FC<
  Pick<RetrospaceadevntureTutorialComponentProps, "views"> & { step: number }
> = ({ views, step }) => {
  const { getAssetImg, getAssetVideo } = useAssets();
  const [showAction, setShowAction] = useState<boolean>(false);

  const currentView = useMemo(() => views[step], [views, step]);

  useEffect(() => {
    if (currentView.action) {
      setTimeout(() => setShowAction(true), 1000);
    }
  }, [currentView]);

  return (
    <>
      <div>
        <h2>
          <TranslationComponent
            // id={`retrospaceadventure_minigame_${currentView.title}`}
            id={currentView.title}
          />
        </h2>
      </div>
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
        <TranslationComponent id={currentView.text} />
      </div>
      {showAction && (
        <RetrospaceadevntureTutorialComponentTutoActionContent
          style={{ width: "20%" }}
        >
          {currentView.action && (
            <RetrospaceadventureButtonComponent
              onClick={currentView.action.callback}
              direction="primary"
              text={currentView.action.text}
            />
          )}
        </RetrospaceadevntureTutorialComponentTutoActionContent>
      )}
      <br />
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
  const [showWithAnimation, setShowWithAnimation] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);
  const { getAssetImg } = useAssets();
  const { innerHeight, innerWidth, playSound } = useGameProvider();
  const { oneTap } = useVibrate();

  useEffect(() => {
    if (refModalContainer.current) {
      if ("scrollBehavior" in document.documentElement.style) {
        // Utiliser la méthode scrollTo avec la propriété 'behavior: "smooth"' pour les navigateurs compatibles
        refModalContainer.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Utiliser la méthode scrollTo sans la propriété 'behavior' pour les navigateurs non compatibles
        refModalContainer.current.scrollTo(0, 0);
      }
    }
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setShowWithAnimation(false);
      setShow(true);
    }, 400);
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
  }, [refParentContainer, innerHeight, innerWidth, updateSize]);

  return (
    <RetrospaceadevntureTutorialComponentContainer
      className={
        showWithAnimation
          ? "animate__animated animate__bounceIn animate__faster"
          : ""
      }
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
            if (step !== 0) {
              setStep(step - 1);
              oneTap();
              playSound("buttonclick.mp3", 0);
            }
          }}
        >
          {step !== 0 && <img src={getAssetImg("left-arrow.png")} alt="" />}
        </div>
        {views.length !== 0 && step !== views.length - 1 && (
          <div
            onClick={() => {
              oneTap();
              playSound("buttonclick.mp3", 0);
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
