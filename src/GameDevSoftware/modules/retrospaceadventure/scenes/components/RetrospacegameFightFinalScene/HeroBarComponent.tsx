import { AnimationComponent } from "../../../../../../components";
import { HeroCardCharacter } from "../RetrospacegameadventurefightsceneStyledComponents";
import { BarRightComponent } from "../styled/Bar";
import { BarProps } from "./EnemyBarComponent";
import useBar from "./hooks/useBar";

const HeroBarComponent: React.FC<BarProps> = ({ character, life }) => {
  const { percentDuration, lifeIcon } = useBar();
  return (
    <HeroCardCharacter className="retrospacegame--fight-final-bar hero-bar">
      <div>
        <BarRightComponent
          percentLife={life}
          percentDuration={percentDuration}
          className="hero-bar-bar"
        >
          <div />
          <div />
          <div>
            <span></span>
            <img src={lifeIcon} />
          </div>
        </BarRightComponent>
      </div>
      <div>
        <AnimationComponent
          animationFile={character.animationFile}
          animationName="idle_thumbnail_animation"
          atlasFile={character.atlasFile}
          imageFile={character.image}
        />
      </div>
    </HeroCardCharacter>
  );
};

export default HeroBarComponent;
