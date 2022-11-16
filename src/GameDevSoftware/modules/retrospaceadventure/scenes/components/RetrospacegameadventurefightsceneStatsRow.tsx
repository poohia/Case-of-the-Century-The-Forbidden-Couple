import { RetrospaceadventureCharacter } from "../types";
import {
  HeroCardCharacter,
  EnemyCardCharacter,
} from "./RetrospacegameadventurefightsceneStyledComponents";
import Bar from "./styled/Bar";

const RetrospacegameadventurefightsceneStatsRowLeft: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  return (
    <EnemyCardCharacter>
      <div>
        <img src={character.image} alt="" />
      </div>
      <div>
        <div>
          <Bar
            baseValue={character.baseLife}
            value={character.life}
            preset="life"
          />
        </div>
        <div>
          <Bar baseValue={1000} value={character.laser} preset="laser" />
        </div>
      </div>
    </EnemyCardCharacter>
  );
};

const RetrospacegameadventurefightsceneStatsRow: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  if (character.character_type === "enemy") {
    return (
      <RetrospacegameadventurefightsceneStatsRowLeft character={character} />
    );
  }
  return (
    <HeroCardCharacter>
      <div>
        <div>
          <Bar baseValue={1000} value={character.laser} preset="laser" />
        </div>
        <div>
          <Bar
            baseValue={character.baseLife}
            value={character.life}
            preset="life"
            mirror
          />
        </div>
      </div>
      <div>
        <img src={character.image} alt="" />
      </div>
    </HeroCardCharacter>
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
