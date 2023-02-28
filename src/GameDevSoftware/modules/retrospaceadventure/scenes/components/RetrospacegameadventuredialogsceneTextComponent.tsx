import { Fragment } from "react";
import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { useAssets } from "../../../../../hooks";
import { ActionOfScene } from "../../../../../types";
import RetrospacegameadventureButtonComponent from "./RetrospacegameadventureButtonComponent";
import {
  ActionsContainer,
  IconsContainer,
  TextContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";

const RetrospacegameadventuredialogsceneTextComponent: React.FC<{
  textContent: string;
  minigames: { thumbnail: string }[];
  _actions: ActionOfScene[];
  onClickCards: () => void;
  onClickMinigame: (minigame: any) => void;
}> = ({ textContent, minigames, _actions, onClickCards, onClickMinigame }) => {
  const { translateText, nextScene } = useGameProvider();
  const { getAssetImg } = useAssets();

  return (
    <TextContainer>
      <div>
        <p>{translateText(textContent)}</p>
      </div>
      <IconsContainer>
        {minigames.map((minigame) => (
          <img
            key={`minigame-thumbnail-${minigame.thumbnail}`}
            alt=""
            src={getAssetImg(minigame.thumbnail)}
            onClick={() => onClickMinigame(minigame)}
          />
        ))}
        <img
          alt=""
          src={getAssetImg("cards-preview.png")}
          onClick={onClickCards}
        />
      </IconsContainer>
      <ActionsContainer>
        {_actions.map((action, i) => (
          <Fragment key={`retrospaceadventure-dialog-scene-action-${i}`}>
            <RetrospacegameadventureButtonComponent
              onClick={() => {
                nextScene(action._scene);
              }}
            >
              <TranslationComponent id={action._title} />
            </RetrospacegameadventureButtonComponent>
          </Fragment>
        ))}
      </ActionsContainer>
    </TextContainer>
  );
};

export default RetrospacegameadventuredialogsceneTextComponent;
