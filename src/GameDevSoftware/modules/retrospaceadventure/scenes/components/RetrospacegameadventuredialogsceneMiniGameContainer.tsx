import {
  CardsComponentContainer,
  MiniGameContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import { useAssets } from "../../../../../hooks";
import { MiniGameType } from "../types";
import VideoComponent from "../../../../../components/VideoComponent";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";

const RetrospacegameadventuredialogsceneMiniGameContainer: React.FC<{
  minigame: MiniGameType;
  onClickClose: () => void;
}> = ({ minigame, onClickClose }) => {
  const { getAssetImg, getAssetVideo } = useAssets();
  const {
    _title,
    tutorial: { computerText, mobileText, video },
  } = minigame;
  const { isMobileDevice } = useGameProvider();
  return (
    <CardsComponentContainer>
      <div>
        <img
          className="animate__animated animate__bounceIn"
          src={getAssetImg("cancel.png")}
          alt=""
          onClick={onClickClose}
        />
      </div>
      <MiniGameContainer>
        <div>
          <h1>
            <TranslationComponent
              id={`retrospaceadventure_minigame_${_title}`}
            />
          </h1>
        </div>
        <div>
          <VideoComponent autoPlay loop src={getAssetVideo(video)} />
        </div>
        <div>
          {isMobileDevice ? (
            <TranslationComponent id={mobileText} />
          ) : (
            <TranslationComponent id={computerText} />
          )}
        </div>
      </MiniGameContainer>
    </CardsComponentContainer>
  );
};

export default RetrospacegameadventuredialogsceneMiniGameContainer;
