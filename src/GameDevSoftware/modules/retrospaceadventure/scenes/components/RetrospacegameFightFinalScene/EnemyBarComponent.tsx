import { AnimationComponent } from "../../../../../../components";
import { MiniGames, RetrospaceadventureCharacter } from "../../types";
import {
  EnemyCardCharacter,
  EnemyCardChoiceSelected,
} from "../RetrospacegameadventurefightsceneStyledComponents";
import { BarLeftComponent } from "../styled/Bar";
import { FinalFightReducerAction } from "./finalFightReducer";
import useBar from "./hooks/useBar";
import useBarEnemy from "./hooks/useBarEnemy";

export type BarProps = {
  character: RetrospaceadventureCharacter;
  life: number;
};

export type EnemyBarProps = BarProps & {
  action: FinalFightReducerAction;
  onSelectMiniGame: (value: MiniGames) => void;
};

const EnemyBarComponent: React.FC<EnemyBarProps> = (props) => {
  const { character, life } = props;
  const { percentDuration, lifeIcon } = useBar();
  const { iconToShow } = useBarEnemy(props);
  return (
    <EnemyCardCharacter className="retrospacegame--fight-final-bar enemy-bar">
      <div>
        <AnimationComponent
          animationFile={character.animationFile}
          animationName="idle_thumbnail_animation"
          atlasFile={character.atlasFile}
          imageFile={character.image}
        />
      </div>
      <div>
        <BarLeftComponent percentLife={life} percentDuration={percentDuration}>
          <div />
          <div>
            <img src={lifeIcon} alt="" />
            <span></span>
          </div>
          <div />
        </BarLeftComponent>
      </div>
      {iconToShow && (
        <EnemyCardChoiceSelected className="animate__animated animate__bounceIn">
          <img src={iconToShow} />
        </EnemyCardChoiceSelected>
      )}
    </EnemyCardCharacter>
  );
};

export default EnemyBarComponent;
