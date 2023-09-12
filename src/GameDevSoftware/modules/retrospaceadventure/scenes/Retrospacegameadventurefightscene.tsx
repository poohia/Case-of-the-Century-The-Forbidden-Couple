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
import { fightTheme, globalTheme } from "./themes";
import { MessageFightInfoStatus, RetrospaceadventureCharacter } from "./types";
import { useScene } from "../../../../hooks";
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
      data: { enemy, hero, nbTurn, _actions },
    } = props;
    useScene(props.data, {
      primarySoundVolume: 0.8,
      preloadSounds: [
        {
          sound: "mixkit-futuristic-cinematic-sweep-2635.mp3",
          loop: false,
          volume: 1,
        },
        {
          sound: "mixkit-glitch-communication-sound-1034.mp3",
          loop: false,
          volume: 1,
        },
        {
          sound:
            "573189__inspectorj__computer-glitching-digital-data-corruption-02-04-loop.mp3",
          loop: false,
          volume: 0.3,
        },
        {
          sound: "win.mp3",
          loop: false,
          volume: 1,
        },
        {
          sound: "loose.mp3",
          loop: false,
          volume: 1,
        },
      ],
      releaseSounds: [
        {
          sound: "mixkit-futuristic-cinematic-sweep-2635.mp3",
          fadeDuration: 0,
        },
        {
          sound: "mixkit-glitch-communication-sound-1034.mp3",
          fadeDuration: 0,
        },
        {
          sound:
            "573189__inspectorj__computer-glitching-digital-data-corruption-02-04-loop.mp3",
          fadeDuration: 0,
        },
        {
          sound: "win.mp3",
          fadeDuration: 0,
        },
        {
          sound: "loose.mp3",
          fadeDuration: 0,
        },
      ],
    });
    const { Hero, Enemy, setHero, setEnemy } =
      useRetrospacegameadventurefightsceneCharacters(enemy, hero);
    const { getData } = useGameProvider();
    const [stateGame, dispatchGame] = useReducer(gameReducer, {
      ...gameLifeDefaultState,
      tutorial: getData<[]>("fight-tutorial") || [],
      nbTurn,
    });
    const [messageFightInfoStatus, setMessageFightInfoStatus] =
      useState<MessageFightInfoStatus>(null);

    const { status, turn } = stateGame;

    useEffect(() => {
      setMessageFightInfoStatus("fight");
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

    // useEffect(() => {
    //   setBackgroundColor(
    //     `url("${getAssetImg(
    //       "backgroundprimary.png"
    //     )}") black no-repeat center center / cover`
    //   );
    // }, [setBackgroundColor, getAssetImg]);

    if (!Hero || !Enemy || !_actions) {
      return <React.Fragment />;
    }

    return (
      <RetrospaceadventureGameContext.Provider
        value={{
          Hero,
          Enemy,
          stateGame,
          messageFightInfoStatus,
          nextSceneId: _actions[0]._scene,
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
        <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
          <RetrospacegameadventurefightsceneWrapper />
        </ThemeProvider>
      </RetrospaceadventureGameContext.Provider>
    );
  };

export default Retrospacegameadventurefightscene;
