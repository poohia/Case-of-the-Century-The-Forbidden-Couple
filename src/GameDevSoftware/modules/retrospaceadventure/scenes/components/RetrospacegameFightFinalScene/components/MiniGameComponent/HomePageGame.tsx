import { useMemo, useState } from "react";
import ChatGPTTypewriterEffect from "react-chatgpt-typewriter";

import { useGameProvider } from "../../../../../../../../gameProvider";
import { useAssets, useVibrate } from "../../../../../../../../hooks";
import { MiniGames } from "../../../../types";
import { HomePageGameContainer } from "./styles";
import VideoComponent from "../../../../../../../../components/VideoComponent";
import { TranslationComponent } from "../../../../../../../../components";

const HomePageGame: React.FC<{ miniGame: MiniGames; onPlay: () => void }> = ({
  miniGame,
  onPlay,
}) => {
  const { getAssetVideo } = useAssets();
  const { translateText } = useGameProvider();
  const { oneTap } = useVibrate();
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const tutorialText = useMemo(
    () => translateText(`retrospaceadventure_minigame_${miniGame}_description`),
    [miniGame, translateText]
  );

  return (
    <HomePageGameContainer>
      <div>
        <VideoComponent
          src={getAssetVideo(`${miniGame}-tutorial.mp4`)}
          loop
          autoPlay
        />
      </div>
      {!showDescription && (
        <div>
          <p
            onClick={() => {
              oneTap();
              onPlay();
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="label_play" />
          </p>
          <p
            onClick={() => {
              oneTap();
              setShowDescription(true);
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="retrospaceadventure_how_to_play" />
          </p>
        </div>
      )}
      {showDescription && (
        <div className="home-page-text-description">
          <ChatGPTTypewriterEffect delay={50} text={tutorialText} />
          <p
            onClick={() => {
              oneTap();
              setShowDescription(false);
            }}
          >
            &gt;&nbsp;
            <TranslationComponent id="label_close" />
          </p>
        </div>
      )}
    </HomePageGameContainer>
  );
};

export default HomePageGame;
