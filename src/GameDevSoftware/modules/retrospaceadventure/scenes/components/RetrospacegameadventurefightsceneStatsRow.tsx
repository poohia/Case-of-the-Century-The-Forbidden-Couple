import { RetrospaceadventureCharacter } from "../types";
import { CardCharacter } from "./RetrospacegameadventurefightsceneStyledComponents";
import Bar from "./styled/Bar";

const RetrospacegameadventurefightsceneStatsRow: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  return (
    <CardCharacter>
      <div>
        <img src={character.image} />
      </div>
      <div>
        {character.character_type === "enemy" && (
          <>
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
          </>
        )}
        {character.character_type === "hero" && (
          <>
            <div>
              <Bar baseValue={1000} value={character.laser} preset="laser" />
            </div>
            <div>
              <Bar
                baseValue={character.baseLife}
                value={character.life}
                preset="life"
              />
            </div>
          </>
        )}
      </div>
    </CardCharacter>
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
