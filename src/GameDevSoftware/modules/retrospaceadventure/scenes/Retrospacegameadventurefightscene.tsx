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
import { useGameProvider } from "../../../../gameProvider";

export type RetrospacegameadventurefightsceneProps = SceneComponentProps<
  {},
  {
    enemy: string;
    hero: string;
    nbTurn: number;
    music: string;
  }
>;

const Retrospacegameadventurefightscene: RetrospacegameadventurefightsceneProps =
  (props) => {
    const {
      data: { enemy, hero, nbTurn, music },
    } = props;
    const { playSoundWithPreload } = useGameProvider();
    const { Hero, Enemy, setHero, setEnemy } =
      useRetrospacegameadventurefightsceneCharacters(enemy, hero);
    const [stateGame, dispatchGame] = useReducer(gameReducer, {
      ...gameLifeDefaultState,
      nbTurn,
    });
    const [messageFightInfoStatus, setMessageFightInfoStatus] =
      useState<MessageFightInfoStatus>(null);

    const { status, turn } = stateGame;

    useEffect(() => {
      setMessageFightInfoStatus("fight");
    }, []);

    useEffect(() => {
      playSoundWithPreload(music, 1, true);
    }, []);

    useEffect(() => {
      if (Hero && Hero.life <= 0) {
        setMessageFightInfoStatus("loose");
        dispatchGame({ type: "gameIsFinish" });
      } else if (Enemy && Enemy.life <= 0) {
        setMessageFightInfoStatus("win");
        dispatchGame({ type: "gameIsFinish" });
      }
    }, [Hero, Enemy]);

    useEffect(() => {
      if (status === "selectionCard" && turn + 1 > nbTurn + 1) {
        setMessageFightInfoStatus("loose");
        dispatchGame({ type: "gameIsFinish" });
      } else if (status === "selectionCard" && turn > 1) {
        setMessageFightInfoStatus("nextTurn");
        setTimeout(() => setMessageFightInfoStatus(null), 2500);
      }
    }, [status, nbTurn, turn]);

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
