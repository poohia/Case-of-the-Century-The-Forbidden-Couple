import { useEffect, useMemo, useRef, useState } from "react";
import { TranslationComponent } from "../../../../../components";
import ModalComponent from "./styled/Modal";
import { TutorialViewType } from "../../../../../types";
import { useAssets } from "../../../../../hooks";
import styled from "styled-components";

type RetrospaceadevntureTutorialComponentProps = {
  views: TutorialViewType[];
  refParentContainer: React.RefObject<HTMLDivElement>;
  lastIcon?: string;
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
  img {
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
  justify-content: flex-end;
  align-items: center;
  div {
    &:nth-child(1) {
      img {
        margin-right: 20px;
      }
    }
  }
  img {
    cursor: pointer;
    width: 24px;
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

const RetrospaceadevntureTutorialComponent: React.FC<
  RetrospaceadevntureTutorialComponentProps
> = ({
  views,
  refParentContainer,
  lastIcon = "right-arrow.png",
  onClickLastStep,
}) => {
  const [step, setStep] = useState<number>(0);
  const refModalContainer = useRef<HTMLDivElement>(null);
  const refModalFooterContainer = useRef<HTMLDivElement>(null);
  const { getAssetImg } = useAssets();

  const currentView = useMemo(() => views[step], [views, step]);

  useEffect(() => {
    if (refModalContainer?.current) {
      refModalContainer.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [step]);

  return (
    <RetrospaceadevntureTutorialComponentContainer>
      <ModalComponent
        width={
          refParentContainer.current
            ? refParentContainer.current.clientWidth - 20
            : 0
        }
        height={
          refParentContainer.current
            ? refParentContainer.current?.clientHeight - 20
            : 0
        }
        refParentContainer={refParentContainer}
        refChildren={refModalContainer}
        refFooterContainer={refModalFooterContainer}
      ></ModalComponent>
      <RetrospaceadevntureTutorialComponentTutoContent ref={refModalContainer}>
        <div>
          <img src={getAssetImg(currentView.image)} alt="" />
        </div>
        <RetrospaceadventureTutorialCarouselInner>
          {views.map((_, i) => (
            <RetrospaceadventureTutorialCarouselInnerItem
              key={`retrospaceadventure-tutorial-carousel-inner-${i}`}
              active={i === step}
            ></RetrospaceadventureTutorialCarouselInnerItem>
          ))}
        </RetrospaceadventureTutorialCarouselInner>
        <div>
          <h2>
            <TranslationComponent id={currentView.title} />
          </h2>
        </div>
        <div>
          <TranslationComponent id={currentView.text} />
        </div>
      </RetrospaceadevntureTutorialComponentTutoContent>
      <RetrospaceadevntureTutorialComponentFooterContent
        ref={refModalFooterContainer}
      >
        {step !== 0 && (
          <div
            onClick={() => {
              setStep(step - 1);
            }}
          >
            <img src={getAssetImg("left-arrow.png")} alt="" />
          </div>
        )}
        {step !== views.length - 1 && (
          <div
            onClick={() => {
              setStep(step + 1);
            }}
          >
            <img src={getAssetImg("right-arrow.png")} alt="" />
          </div>
        )}
        {step === views.length - 1 && (
          <div onClick={onClickLastStep}>
            <img src={getAssetImg(lastIcon)} alt="" />
          </div>
        )}
      </RetrospaceadevntureTutorialComponentFooterContent>
    </RetrospaceadevntureTutorialComponentContainer>
  );
};

export default RetrospaceadevntureTutorialComponent;
