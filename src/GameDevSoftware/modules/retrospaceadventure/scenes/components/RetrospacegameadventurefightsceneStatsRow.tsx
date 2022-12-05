import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";
import { RetrospaceadventureCharacter } from "../types";
import RetrospaceAdventureSpriteComponent from "./RetrospaceAdventureSpriteComponent";
import {
  HeroCardCharacter,
  EnemyCardCharacter,
} from "./RetrospacegameadventurefightsceneStyledComponents";
import Bar from "./styled/Bar";

const RetrospacegameadventurefightsceneStatsCannonLaserContainer = styled.div<{
  justifyContent: "start" | "end";
}>`
  display: flex;
  ${({ justifyContent }) =>
    justifyContent === "end" && "justify-content: flex-end;"}
  div {
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
    color: orange;
  }
  background-color: rgba(255, 255, 255, 0.4);
  width: 98%;
  border-radius: 3px;
`;

const RetrospacegameadventurefightsceneStatsCannonLaser: React.FC<{
  value: number;
  justifyContent: "start" | "end";
}> = ({ value, justifyContent }) => {
  const { getAssetImg } = useAssets();
  const [finalValue, setFinalValue] = useState<number>(0);

  useEffect(() => {
    let startValue = finalValue;
    const timeout = setInterval(() => {
      if (startValue + 1 >= value) {
        setFinalValue(value);
        clearInterval(timeout);
      } else {
        setFinalValue(startValue + 1);
        startValue += 10;
      }
    }, 100);
  }, [value]);

  return (
    <RetrospacegameadventurefightsceneStatsCannonLaserContainer
      justifyContent={justifyContent}
    >
      {justifyContent === "start" && (
        <div>
          <img src={getAssetImg("cannon.png")} alt="" />
        </div>
      )}
      <div>{finalValue}</div>
      {justifyContent === "end" && (
        <div>
          <img src={getAssetImg("cannon.png")} alt="" />
        </div>
      )}
    </RetrospacegameadventurefightsceneStatsCannonLaserContainer>
  );
};

const RetrospacegameadventurefightsceneStatsRowLeft: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  return (
    <EnemyCardCharacter>
      <div>
        {/* <img src={character.image} alt="" /> */}
        <RetrospaceAdventureSpriteComponent
          width={55}
          image={character.image}
          maxFrame={1}
          loop={true}
          timeBeetweenSprite={300}
        />
      </div>
      <div>
        <div>
          <Bar baseValue={character.baseLife} value={character.life} />
        </div>
        <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"start"}
        />
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
        <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"end"}
        />
        <div>
          <Bar baseValue={character.baseLife} value={character.life} />
        </div>
      </div>
      <div>
        {/* <img src={character.image} alt="" /> */}
        <RetrospaceAdventureSpriteComponent
          width={65}
          image={character.image}
          maxFrame={3}
          loop={true}
          timeBeetweenSprite={300}
        />
      </div>
    </HeroCardCharacter>
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
