// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import React, { useEffect, useReducer, useState } from "react";
import useRetrospacegameadventurefightsceneCharacters from "./hooks/useRetrospacegameadventurefightsceneCharacters";
import gameReducer, { gameLifeDefaultState } from "./reducers/gameReducer";

import "animate.css";

import { SceneComponentProps } from "../../../../types";
import RetrospacegameadventurefightsceneWrapper from "./RetrospacegameadventurefightsceneWrapper";
import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import { ThemeProvider } from "styled-components";
import { fightTheme } from "./themes";
import { MessageFightInfoStatus, RetrospaceadventureCharacter } from "./types";

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
    const [messageFightInfoStatus, setMessageFightInfoStatus] =
      useState<MessageFightInfoStatus>(null);

    useEffect(() => {
      setMessageFightInfoStatus("fight");
    }, []);

    useEffect(() => {
      if (Hero && Hero.life <= 0) {
        setMessageFightInfoStatus("loose");
      } else if (Enemy && Enemy.life <= 0) {
        setMessageFightInfoStatus("win");
      }
    }, [Hero, Enemy]);

    if (!Hero || !Enemy) {
      return <React.Fragment />;
    }

    return (
      <RetrospaceadventureGameContext.Provider
        value={{
          Hero,
          Enemy,
          stateGame,
          messageFightInfoStatus,
          updateHero: setHero as React.Dispatch<
            React.SetStateAction<RetrospaceadventureCharacter>
          >,
          updateEnemy: setEnemy as React.Dispatch<
            React.SetStateAction<RetrospaceadventureCharacter>
          >,
          dispatchGame,
          sendMessageFightInfosStatus: setMessageFightInfoStatus,
        }}
      >
        <ThemeProvider theme={{ ...fightTheme }}>
          <RetrospacegameadventurefightsceneWrapper />
        </ThemeProvider>
      </RetrospaceadventureGameContext.Provider>
    );
  };

export default Retrospacegameadventurefightscene;
