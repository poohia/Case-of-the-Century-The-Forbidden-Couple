import { RetrospaceadventureCharacter } from "../types";
import { ContainerRowComponent } from "./RetrospacegameadventurefightsceneStyledComponents";

const RetrospacegameadventurefightsceneStatsRow: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  return (
    <ContainerRowComponent>
      <p>{character.name}</p>
      <p>
        <img src={character.image} width="50" />
      </p>
      <p>life: {character.life}</p>
      <p>laser: {character.laser}</p>
    </ContainerRowComponent>
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
