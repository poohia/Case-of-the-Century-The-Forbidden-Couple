import { CardsComponentContainer } from "./RetrospacegameadventuredialogsceneStyledComponents";
import { MiniGameType } from "../types";
import { useGameProvider } from "../../../../../gameProvider";
import { TutorialViewType } from "../../../../../types";
import { useMemo, useRef } from "react";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";

const RetrospacegameadventuredialogsceneMiniGameContainer: React.FC<{
  minigame: MiniGameType;
  onClickClose: () => void;
}> = ({ minigame, onClickClose }) => {
  const { translateText } = useGameProvider();
  const {
    _title,
    tutorial: { computerText, mobileText, video },
  } = minigame;
  const refContainer = useRef<HTMLDivElement>(null);
  const { isMobileDevice } = useGameProvider();
  const views: TutorialViewType[] = useMemo(() => {
    return [
      {
        title: _title,
        image: video,
        text: isMobileDevice
          ? translateText(mobileText)
          : translateText(computerText),
        isVideo: true,
      },
    ];
  }, [_title, computerText, mobileText, video, isMobileDevice, translateText]);

  return (
    <CardsComponentContainer ref={refContainer}>
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
