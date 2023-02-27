import { useEffect, useMemo, useRef, useState } from "react";
import { PageComponent, TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { SceneComponentProps, TutorialViewType } from "../../../../types";
import { useAssets } from "../../../../hooks";
import styled from "styled-components";

const ContainerComponent = styled.div`
  height: 100%;
  background: url("assets/images/backgroundprimary.png");
  overflow-y: auto !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  div {
    margin: 15px;
    line-height: 3rem;
    &:nth-child(3) {
      font-size: 1.3rem;
    }
  }
  h1 {
    margin: 0;
  }
  img {
    max-width: 400px;
  }
`;

export type RetrospacegameadventuredialogsceneProps = SceneComponentProps<
  {},
  {
    views: TutorialViewType[];
  }
>;

const Retrospacegameadventuretutorialscene: RetrospacegameadventuredialogsceneProps =
  (props) => {
    const {
      data: { views, _actions },
    } = props;
    const { nextScene } = useGameProvider();
    const { getAssetImg } = useAssets();
    const [step, setStep] = useState<number>(0);
    const currentView = useMemo(() => views[step], [views, step]);
    const lastStep = useMemo(() => step === views.length - 1, [step, views]);
    const nextSceneObject = useMemo(() => _actions[0], [_actions]);
    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (refContainer.current) {
        refContainer.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }, [step, refContainer]);

    return (
      <PageComponent>
        <ContainerComponent ref={refContainer}>
          <div>
            <h1>
              <TranslationComponent id={currentView.title} />
            </h1>
          </div>
          <div>
            <img src={getAssetImg(currentView.image)} alt="" />
          </div>
          <div>
            <TranslationComponent id={currentView.text} />
          </div>
          <div>
            <button
              onClick={() => {
                if (lastStep) {
                  nextScene(nextSceneObject._scene);
                } else {
                  setStep(step + 1);
                }
              }}
            >
              {lastStep ? (
                <TranslationComponent id={nextSceneObject._title} />
              ) : (
                <TranslationComponent id="label_next" />
              )}
            </button>
          </div>
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuretutorialscene;
