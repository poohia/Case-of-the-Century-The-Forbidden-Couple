import { useEffect, useMemo, useRef, useState } from "react";
import { PageComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { SceneComponentProps, TutorialViewType } from "../../../../types";
import styled from "styled-components";
import RetrospaceadevntureTutorialComponent from "./components/RetrospaceadevntureTutorialComponent";
import { useAssets } from "../../../../hooks";
import { useConstants } from "../../../../gameProvider/hooks";

const ContainerComponent = styled.div`
  height: 100%;
  // background: url("assets/images/backgroundprimary.png");
  // background-size: cover;
  overflow-y: auto !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
    const { nextScene, setBackgroundColor } = useGameProvider();
    const { getAssetImg } = useAssets();
    const nextSceneObject = useMemo(() => _actions[0], [_actions]);
    const refContainer = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const { getValueFromConstant } = useConstants();

    const maxSizeGameContainer = useMemo(() => {
      const [width, height] = getValueFromConstant(
        "retrospaceadventure_max_width_height_views"
      );
      return { width, height };
    }, [getValueFromConstant]);

    useEffect(() => {
      if (refContainer.current) setShow(true);
    }, [refContainer]);

    useEffect(() => {
      setBackgroundColor(
        `url("${getAssetImg(
          "backgroundprimary.png"
        )}") black no-repeat center center / cover`
      );
    }, [setBackgroundColor, getAssetImg]);

    return (
      <PageComponent maxSize={maxSizeGameContainer}>
        <ContainerComponent ref={refContainer}>
          {show && (
            <RetrospaceadevntureTutorialComponent
              refParentContainer={refContainer}
              views={views}
              lastIcon="fight-icon.png"
              onClickLastStep={() => nextScene(nextSceneObject._scene)}
            />
          )}
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuretutorialscene;
