// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import { PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import {
  ContainerComponent,
  ContainerRowComponent,
} from "./components/RetrospacegameadventurefightsceneStyledComponents";
import RetrospacegameadventurefightsceneStatsRow from "./components/RetrospacegameadventurefightsceneStatsRow";

import "animate.css";
import useRetrospacegameadventurefightsceneCharacters from "./hooks/useRetrospacegameadventurefightsceneCharacters";
import useRetrospacegameadventurefightsceneParty from "./hooks/useRetrospacegameadventurefightsceneParty";
import { GameReducerActionData } from "./reducers/gameReducer";

export type RetrospacegameadventurefightsceneProps = SceneComponentProps<
  {},
  {
    enemy: string;
    hero: string;
  }
>;

const Retrospacegameadventurefightscene: RetrospacegameadventurefightsceneProps =
  (props) => {
    const {
      data: { enemy, hero },
    } = props;
    const { Hero, Enemy, setHero, setEnemy } =
      useRetrospacegameadventurefightsceneCharacters(enemy, hero);
    const { stateGame, dispatchGame } =
      useRetrospacegameadventurefightsceneParty(Hero, Enemy, setHero, setEnemy);

    if (!Hero || !Enemy) {
      return <div />;
    }

    const { status } = stateGame;
    console.log(
      "🚀 ~ file: Retrospacegameadventurefightscene.tsx ~ line 39 ~ stateGame",
      stateGame
    );

    return (
      <PageComponent>
        <ContainerComponent>
          <RetrospacegameadventurefightsceneStatsRow character={Enemy} />
          <ContainerRowComponent>
            {status === "selectionCard" &&
              stateGame.hero.cards.map((card) => (
                <div
                  key={card.name}
                  onClick={() =>
                    dispatchGame({
                      type: "selectCard",
                      data: {
                        heroCardSelect: card,
                      } as GameReducerActionData,
                    })
                  }
                >
                  {card.name}
                </div>
              ))}
            {status === "selectionElement" && (
              <div>
                <div
                  onClick={() =>
                    dispatchGame({
                      type: "selectElement",
                      data: {
                        heroElementSelect: 1,
                      } as GameReducerActionData,
                    })
                  }
                >
                  Electricité
                </div>
                <div
                  onClick={() =>
                    dispatchGame({
                      type: "selectElement",
                      data: {
                        heroElementSelect: 2,
                      } as GameReducerActionData,
                    })
                  }
                >
                  Laser
                </div>
                <div
                  onClick={() =>
                    dispatchGame({
                      type: "selectElement",
                      data: {
                        heroElementSelect: 3,
                      } as GameReducerActionData,
                    })
                  }
                >
                  Feu
                </div>
              </div>
            )}
          </ContainerRowComponent>
          <RetrospacegameadventurefightsceneStatsRow character={Hero} />
        </ContainerComponent>
      </PageComponent>
    );
  };

export default Retrospacegameadventurefightscene;
