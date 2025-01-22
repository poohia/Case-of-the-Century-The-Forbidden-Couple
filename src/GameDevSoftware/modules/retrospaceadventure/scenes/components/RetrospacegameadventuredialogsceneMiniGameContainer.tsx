import { useEffect, useMemo, useRef, useState } from "react";

import { CardsComponentContainer } from "./RetrospacegameadventuredialogsceneStyledComponents";
import { MiniGameType } from "../types";
import { useGameProvider } from "../../../../../gameProvider";
import { TutorialViewType } from "../../../../../types";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";
import { useConstants } from "../../../../../gameProvider/hooks";

const RetrospacegameadventuredialogsceneMiniGameContainer: React.FC<{
  minigame: MiniGameType;
  onClickClose: () => void;
}> = ({ minigame, onClickClose }) => {
  const { innerHeight, innerWidth, translateText } = useGameProvider();
  const [showBackgroundOpacity, setShowBackgroundOpacity] =
    useState<boolean>(true);
  const {
    _title,
    tutorial: { text, video },
  } = minigame;
  const refContainer = useRef<HTMLDivElement>(null);
  const { isMobileDevice, getValueFromConstant } = useGameProvider();
  // const { getValueFromConstant } = useConstants();

  const maxSizeGameContainer = useMemo(() => {
    const [width, height] = getValueFromConstant(
      "retrospaceadventure_max_width_height_views"
    );
    return { width, height };
  }, [getValueFromConstant]);
  const views: TutorialViewType[] = useMemo(() => {
    return [
      {
        title: `retrospaceadventure_minigame_${_title}`,
        image: video,
        text: translateText(text),
        isVideo: true,
      },
    ];
  }, [_title, text, video, isMobileDevice, translateText]);

  useEffect(() => {
    if (
      innerHeight > maxSizeGameContainer.height ||
      innerWidth > maxSizeGameContainer.width
    ) {
      setShowBackgroundOpacity(false);
    } else {
      setShowBackgroundOpacity(true);
    }
  }, [innerHeight, innerWidth]);

  return (
    <CardsComponentContainer
      showBackgroundOpacity={showBackgroundOpacity}
      ref={refContainer}
    >
      <RetrospaceadevntureTutorialComponent
        lastIcon="cancel.png"
        views={views}
        refParentContainer={refContainer}
        onClickLastStep={onClickClose}
      />
    </CardsComponentContainer>
  );
};

export default RetrospacegameadventuredialogsceneMiniGameContainer;
