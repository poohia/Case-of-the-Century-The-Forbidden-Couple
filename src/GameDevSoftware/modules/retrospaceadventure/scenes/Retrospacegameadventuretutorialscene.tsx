import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { PageComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { SceneComponentProps, TutorialViewType } from "../../../../types";
import RetrospaceadevntureTutorialComponent from "./components/RetrospaceadevntureTutorialComponent";
import { useScene } from "../../../../hooks";
import { useConstants } from "../../../../gameProvider/hooks";

const ContainerComponent = styled.div`
  height: 100%;
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
      data: { views },
    } = props;
    const { nextScene } = useScene(props.data, {
      preloadSounds: [
        {
          sound: "buttonclick.mp3",
          loop: false,
          volume: 1,
        },
      ],
    });
    const { playSound, getValueFromConstant } = useGameProvider();
    const refContainer = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    // const { getValueFromConstant } = useConstants();

    const maxSizeGameContainer = useMemo(() => {
      const [width, height] = getValueFromConstant(
        "retrospaceadventure_max_width_height_views"
      );
      return { width, height };
    }, [getValueFromConstant]);

    useEffect(() => {
      if (refContainer.current) {
        setShow(true);
      }
    }, [refContainer]);

    return (
      <PageComponent maxSize={maxSizeGameContainer}>
        <ContainerComponent ref={refContainer}>
          {show && (
            <RetrospaceadevntureTutorialComponent
              refParentContainer={refContainer}
              views={views}
              lastIcon="fight-icon.png"
              onClickLastStep={() => {
                playSound("buttonclick.mp3", 0);
                nextScene();
              }}
            />
          )}
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventuretutorialscene;
