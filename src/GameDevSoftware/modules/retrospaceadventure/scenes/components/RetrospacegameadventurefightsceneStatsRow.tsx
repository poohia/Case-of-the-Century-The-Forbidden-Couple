import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { RetrospaceadventureCharacter } from "../types";
import {
  HeroCardCharacter,
  EnemyCardCharacter,
  EnemyCardChoiceSelected,
  HeroCardChoiceSelected,
} from "./RetrospacegameadventurefightsceneStyledComponents";
import Bar from "./styled/Bar";
import { SpriteComponent } from "../../../../../components";

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
  img {
    width: 48px;
  }
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
  forceZeroLife: boolean;
}> = ({ character, forceZeroLife }) => {
  const {
    stateGame: { effectState, enemy, status },
  } = useContext(RetrospaceadventureGameContext);

  const [showDamageSprite, setShowDamageSprite] = useState<boolean>(false);
  const [showCardEnemy, setShowCardEnemy] = useState<boolean>(false);
  const cardEnemy = useMemo(() => {
    if (enemy.cardChoice) {
      return enemy.cards.find((c) => c.id === enemy.cardChoice);
    }
    return null;
  }, [enemy]);

  useEffect(() => {
    if (effectState?.message === "criticalHero") {
      setShowDamageSprite(true);
    }
  }, [effectState]);

  useEffect(() => {
    if (status === "startMinigame") {
      setShowCardEnemy(true);
    } else {
      setShowCardEnemy(false);
    }
  }, [status]);

  return (
    <EnemyCardCharacter>
      <div>
        {!showDamageSprite && <SpriteComponent {...character.imageIdle} />}
        {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )}
        {showCardEnemy && cardEnemy && (
          <EnemyCardChoiceSelected className="animate__animated animate__bounceIn">
            <img src={cardEnemy.image} alt="" />
          </EnemyCardChoiceSelected>
        )}
      </div>
      <div>
        <div>
          <Bar
            baseValue={character.baseLife}
            value={forceZeroLife ? 0 : character.life}
          />
        </div>
        <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"start"}
        />
      </div>
    </EnemyCardCharacter>
  );
};

const RetrospacegameadventurefightsceneStatsRowRight: React.FC<{
  character: RetrospaceadventureCharacter;
  forceZeroLife: boolean;
}> = ({ character, forceZeroLife }) => {
  const {
    stateGame: { effectState, hero, status },
  } = useContext(RetrospaceadventureGameContext);

  const [showDamageSprite, setShowDamageSprite] = useState<boolean>(false);
  const [showCardHero, setShowCardHero] = useState<boolean>(false);
  const cardHero = useMemo(() => {
    if (hero.cardChoice) {
      return hero.cards.find((c) => c.id === hero.cardChoice);
    }
    return null;
  }, [hero]);

  useEffect(() => {
    if (effectState?.message === "criticalEnemy") {
      setShowDamageSprite(true);
    }
  }, [effectState]);

  useEffect(() => {
    if (status === "startMinigame") {
      setShowCardHero(true);
    } else {
      setShowCardHero(false);
    }
  }, [status]);

  return (
    <HeroCardCharacter>
      <div>
        <RetrospacegameadventurefightsceneStatsCannonLaser
          value={character.laser}
          justifyContent={"end"}
        />
        <div>
          <Bar
            baseValue={character.baseLife}
            value={forceZeroLife ? 0 : character.life}
          />
        </div>
      </div>
      <div>
        {showCardHero && cardHero && (
          <HeroCardChoiceSelected className="animate__animated animate__bounceIn">
            <img src={cardHero.image} alt="" />
          </HeroCardChoiceSelected>
        )}
        {!showDamageSprite && <SpriteComponent {...character.imageIdle} />}
        {showDamageSprite && (
          <SpriteComponent
            {...character.imageDamage}
            onFinish={() => setShowDamageSprite(false)}
          />
        )}
      </div>
    </HeroCardCharacter>
  );
};

const RetrospacegameadventurefightsceneStatsRow: React.FC<{
  character: RetrospaceadventureCharacter;
}> = ({ character }) => {
  const { messageFightInfoStatus } = useContext(RetrospaceadventureGameContext);
  const [forceZeroLifeHero, setForceZeroLifeHero] = useState<boolean>(false);
  const [forceZeroLifeEnemy, setForceZeroLifeEnemy] = useState<boolean>(false);

  useEffect(() => {
    if (
      messageFightInfoStatus === "loose" &&
      character.character_type === "hero"
    ) {
      setForceZeroLifeHero(true);
    }
    if (
      messageFightInfoStatus === "win" &&
      character.character_type === "enemy"
    ) {
      setForceZeroLifeEnemy(true);
    }
  }, [messageFightInfoStatus, character]);

  if (character.character_type === "enemy") {
    return (
      <RetrospacegameadventurefightsceneStatsRowLeft
        character={character}
        forceZeroLife={forceZeroLifeEnemy}
      />
    );
  }
  return (
    <RetrospacegameadventurefightsceneStatsRowRight
      character={character}
      forceZeroLife={forceZeroLifeHero}
    />
  );
};

export default RetrospacegameadventurefightsceneStatsRow;
