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
import { useAssets } from "../../../../hooks";

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
    const { preloadSound, soundsLoaded, playSound } = useGameProvider();
    const { Hero, Enemy, setHero, setEnemy } =
      useRetrospacegameadventurefightsceneCharacters(enemy, hero);
    const [stateGame, dispatchGame] = useReducer(gameReducer, {
      ...gameLifeDefaultState,
      nbTurn,
    });
    const [messageFightInfoStatus, setMessageFightInfoStatus] =
      useState<MessageFightInfoStatus>(null);
    const {} = useAssets();

    const { status, turn } = stateGame;

    useEffect(() => {
      setMessageFightInfoStatus("fight");
    }, [soundsLoaded]);

    useEffect(() => {
      const musicId = `retrospaceadventure_${music
        .replace("@a:", "")
        .replace(".mp3", "")}`;
      console.log(musicId, !!soundsLoaded.find((s) => s.id === musicId));
      if (!!soundsLoaded.find((s) => s.id === musicId)) {
        playSound("retrospaceadventure_through_space", true);
      } else {
        preloadSound(
          "retrospaceadventure_through_space",
          "through_space.mp3",
          1,
          1,
          0
        ).then(() => playSound("retrospaceadventure_through_space", true));
      }
    }, []);

    useEffect(() => {
      if (Hero && Hero.life <= 0) {
        setMessageFightInfoStatus("loose");
      } else if (Enemy && Enemy.life <= 0) {
        setMessageFightInfoStatus("win");
      }
    }, [Hero, Enemy]);

    useEffect(() => {
      if (status === "selectionCard" && turn + 1 > nbTurn + 1) {
        setMessageFightInfoStatus("loose");
      } else if (status === "selectionCard" && turn > 1) {
        setMessageFightInfoStatus("nextTurn");
        setTimeout(() => setMessageFightInfoStatus(null), 2000);
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
