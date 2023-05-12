import { CardsComponentContainer } from "./RetrospacegameadventuredialogsceneStyledComponents";
import { MiniGameType } from "../types";
import { useGameProvider } from "../../../../../gameProvider";
import { TutorialViewType } from "../../../../../types";
import { useEffect, useMemo, useRef, useState } from "react";
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
    tutorial: { computerText, mobileText, video },
  } = minigame;
  const refContainer = useRef<HTMLDivElement>(null);
  const { isMobileDevice } = useGameProvider();
  const { getValueFromConstant } = useConstants();

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
        text: isMobileDevice
          ? translateText(mobileText)
          : translateText(computerText),
        isVideo: true,
      },
    ];
  }, [_title, computerText, mobileText, video, isMobileDevice, translateText]);

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
