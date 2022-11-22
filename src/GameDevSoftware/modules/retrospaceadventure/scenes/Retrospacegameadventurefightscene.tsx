// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import React, { useReducer } from "react";
import useRetrospacegameadventurefightsceneCharacters from "./hooks/useRetrospacegameadventurefightsceneCharacters";
import gameReducer, { gameLifeDefaultState } from "./reducers/gameReducer";

import { SceneComponentProps } from "../../../../types";
import "animate.css";
import RetrospacegameadventurefightsceneWrapper from "./RetrospacegameadventurefightsceneWrapper";
import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import { ThemeProvider } from "styled-components";
import { fightTheme } from "./themes";

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
    const [stateGame, dispatchGame] = useReducer(
      gameReducer,
      gameLifeDefaultState
    );

    if (!Hero || !Enemy) {
      return <React.Fragment />;
    }

    console.log(stateGame);

    return (
      <RetrospaceadventureGameContext.Provider
        value={{
          Hero,
          Enemy,
          stateGame,
          updateHero: setHero,
          updateEnemy: setEnemy,
          dispatchGame,
        }}
      >
        <ThemeProvider theme={{ ...fightTheme }}>
          <RetrospacegameadventurefightsceneWrapper />
        </ThemeProvider>
      </RetrospaceadventureGameContext.Provider>
    );
  };

export default Retrospacegameadventurefightscene;
