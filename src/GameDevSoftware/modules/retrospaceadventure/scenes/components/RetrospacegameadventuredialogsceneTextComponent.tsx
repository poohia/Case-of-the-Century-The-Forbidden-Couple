import { Fragment } from "react";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { ActionOfScene } from "../../../../../types";
import {
  ActionsContainer,
  IconsContainer,
  TextContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";

const RetrospacegameadventuredialogsceneTextComponent: React.FC<{
  textContent: string;
  minigames: { thumbnail: string }[];
  _actions: ActionOfScene[];
  onClickCards: () => void;
  onClickMinigame: (minigame: any) => void;
}> = ({ textContent, minigames, _actions, onClickCards, onClickMinigame }) => {
  const { translateText, nextScene } = useGameProvider();

  return (
    <TextContainer>
      <div>
        <p>{translateText(textContent)}</p>
      </div>
      <div>
        <h4>
          <TranslationComponent id="retrospaceadventure_dialog_label_actions" />
        </h4>
      </div>
      <IconsContainer>
        {minigames.map((minigame) => (
          <ImgComponent
            key={`minigame-thumbnail-${minigame.thumbnail}`}
            src={minigame.thumbnail}
            onClick={() => onClickMinigame(minigame)}
          />
        ))}
        <ImgComponent src={"cards-preview.png"} onClick={onClickCards} />
      </IconsContainer>
      <ActionsContainer>
        {_actions.map((action, i) => (
          <Fragment key={`retrospaceadventure-dialog-scene-action-${i}`}>
            {/* <RetrospacegameadventureButtonComponent
              onClick={() => {
                nextScene(action._scene);
              }}
            >
              <TranslationComponent id={action._title} />
            </RetrospacegameadventureButtonComponent> */}
            {action._title && (
              <RetrospaceadventureButtonComponent
                fluid
                onClick={() => nextScene(action._scene)}
                text={translateText(action._title)}
              />
            )}
          </Fragment>
        ))}
      </ActionsContainer>
    </TextContainer>
  );
};

export default RetrospacegameadventuredialogsceneTextComponent;
